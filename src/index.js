const express = require('express');
const bodyParser = require('body-parser');


const {PORT} = require('./config/serverConfig');
const apiRoutes = require('./routes/index');

// const { User } = require('./models/index');
// const bcrypt = require('bcrypt');
// const UserRepository = require('./repository/user-repository');
// const UserService = require('./services/user-service');

const app = express();
const prepareAndStartServer = () => {

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));

    app.use('/api', apiRoutes);


    app.listen(PORT, async () => {

        console.log(`Server started on port ${PORT}`);
        // const incomingPass = '123456';
        // const user = await User.findByPk(3);
        // const response = bcrypt.compareSync(incomingPass, user.password);
        // console.log(response);
        // const userRepository = new UserRepository();
        // const user = await userRepository.getById(3);
        // console.log(user);
        // const userService = new UserService();
        // const token = await userService.createToken({email: 'sanket@admin.com', id: 2});
        // console.log("New token is:", token);
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNhbmtldEBhZG1pbi5jb20iLCJpZCI6MiwiaWF0IjoxNjg5NTY3MjI1LCJleHAiOjE2ODk1NjcyNTV9.d82X7a3Kut1Sox7cQBMXxznL3lWdwWP-CM-cuYK0Uf0";
        // const response = await userService.verifyToken(token);
        // console.log(response);

    });

}

prepareAndStartServer();