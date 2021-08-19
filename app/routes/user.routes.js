module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new users
    app.post('/validator', users.create);
}