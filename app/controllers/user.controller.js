const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    const user = new User({
        Info: req.body.Info
    });

    user.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};