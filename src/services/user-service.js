const jwt = require('jsonwebtoken');

const UserRepository = require('../repository/user-repository');
const { JWT_KEY } = require('../config/serverConfig');
const bcrypt = require('bcrypt');

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
            console.log("Something went wrong in User service layer");
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

}

module.exports = UserService;