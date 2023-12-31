const jwt = require('jsonwebtoken');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');
const AppErrors = require('../utils/error-handler');

class UserService {

    constructor() {
        this.userRepository = new UserRepository();
    }

    async create(data) {
        try {
            const user = this.userRepository.create(data);
            return user;  
        } 
        catch (error) {
            console.log("servername :", error.name )
            if(error.name == "SequelizeValidationError") {
                throw error;
            }
            console.log("Something went wrong in the service layer");
            throw error;
        }
    }

    async destroy(userId) {
        try {
            const response = await this.userRepository.destroy(userId);
            return response; 
        } 
        catch (error) {
            console.log("Something went wrong in User service layer");
            throw error;
        }
    }

    async signIn(email, plainPassword) {
        try {
            // Step 1 -> Fetch the user by email 
            const user = await this.userRepository.getByEmail(email);
            // Step 2 -> compare the incoming plain password with encrypted password stored in database
            const passwordsMatch = this.checkPassword(plainPassword, user.password);

            if(!passwordsMatch) {
                console.log("Password doesn't match");
                throw {error: "Incorrect Password"};
            }
            // Step 3 -> If passwords match then create a token and send to user
            const newJWT = this.createToken({email: user.email, id: user.id});
            return newJWT; 

        } 
        catch (error) {
            console.log("Something went wrong in the signin process");
            throw error;    
        }
    }

    async isAuthenticated(token) {
        try {
            const response = await this.verifyToken(token);
            if(!response) {
                throw {error: "Invalid token"};
            }

            const user = await this.userRepository.getById(response.id);
            if(!user) {
                throw {error: "No user with the corresponding token exists"};
            }

            return user.id;
        } 
        catch (error) {
            console.log("Something went wrong in the isAuthenticated process");
            throw error;
        }
    }

    createToken(user) {
        try {
            const result = jwt.sign(user, JWT_KEY, {expiresIn: '1d'});
            return result;
        } 
        catch (error) {
            console.log("Something went wrong in createToken User Service layer");
            throw error;   
        }
    }

    verifyToken(token) {
        try {
            const response = jwt.verify(token, JWT_KEY);
            return response;
        } 
        catch (error) {
            console.log("Something went wrong in verifyToken User Service layer", error);
            throw error;   
        }
    }

    checkPassword(userInputPlainPassword, encryptedPassword) {
        try {
            return bcrypt.compareSync(userInputPlainPassword, encryptedPassword);
        } 
        catch (error) {
            console.log("Something went wrong in checkPassword in User service layer");    
            throw error;
        }
    }

    isAdmin(userId) {
        try {
            return this.userRepository.isAdmin(userId);
        } 
        catch (error) {
            console.log("Something went wrong in isAdmin process in service layer");
            throw error;
        }
    }

}

module.exports = UserService;