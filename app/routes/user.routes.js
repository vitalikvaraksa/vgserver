module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new users
    app.post('/users/create', users.create);

    // Check a single user by proerty such as username, email, mobile, referralId
    app.post('/users/checkExist', users.checkExist);

    // Sign in or out
    app.post('/users/sign', users.signUser);

    // Retrieve a single user by id
    app.post('/users/getInfo', users.findOne);

    /*// Retrieve all users
    app.get('/users', users.findAll);

    // Update a User with id
    app.put('/users/:id', users.update);

    // Delete a User by id
    app.delete('/users/:id', users.delete);*/
}