const User = require('../models/user.model.js');

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body.fullName) {
        return res.status(400).send({
            message: "User full name can not be empty"
        });
    }

    if(!req.body.userName) {
        return res.status(400).send({
            message: "User user name can not be empty"
        });
    }

    if(!req.body.email) {
        return res.status(400).send({
            message: "User email can not be empty"
        });
    }

    if(!req.body.password) {
        return res.status(400).send({
            message: "User password can not be empty"
        });
    }

    if(!req.body.country) {
        return res.status(400).send({
            message: "User country can not be empty"
        });
    }

    if(!req.body.mobile) {
        return res.status(400).send({
            message: "User mobile can not be empty"
        });
    }

    User.exists(req.body)
    .then(user => {
        console.log(user)
        if(user === true) {
            console.log('user already exist')
            return res.send({message: "User Already exist"});
        } else {
            User.exists({userName: req.body.userName})
            .then(res => {
                if (res === false) {
                } else {
                    return res.status(404).send({message: "User Already exist"});
                }
            })
            // Create a User
            const user = new User({
                fullName: req.body.fullName,
                userName: req.body.userName,
                email: req.body.email,
                password: req.body.password,
                country: req.body.country,
                mobile: req.body.mobile,
                referralId: req.body.referralId,
            });

            // Save User in the database
            user.save()
            .then(data => {
                res.send(data);
            }).catch(err => {
                res.status(500).send({
                    message: err.message || "Some error occurred while creating the User."
                });
            });
        }
    })

    
};

exports.checkExist = (req, res) => {
    if(!req.body.userName && !req.body.email && !req.body.mobile) {
        return res.status(400).send({
            message: "Query not correct"
        });
    }

    User.exists(req.body)
    .then(user => {
        console.log(user)
        if(user === true) {
            return res.send({
                message: "Already Exist"
            });  
        } else {
            return res.send({
                message: ""
            });  
        }
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving user with this information"
        });
    });
};

// Check a single user with a id
exports.signUser = (req, res) => {
    if(!req.body.userName && !req.body.email) {
        return res.status(400).send({
            message: "Query not correct"
        });
    }

    if(!req.body.password) {
        return res.status(400).send({
            message: "Query not correct"
        });
    }

    User.exists(req.body)
    .then(user => {
        if(user === false) {
            return res.status(404).send({
                message: "User not found with this information"
            });            
        }
        User.find()
        .then(users=> {
            for (let index = 0; index < users.length; index++) {
                const element = users[index];
                if ((req.body.userName && element.userName === req.body.userName) || (req.body.email && element.email === req.body.email)) {
                    res.send(element);
                    return;
                }
            }
        })
    }).catch(err => {
        return res.status(500).send({
            message: "Error retrieving user with this information"
        });
    });
};

// Find a single user with a id
exports.findOne = (req, res) => {
    User.findById(req.body.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });            
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error retrieving user with id " + req.params.id
        });
    });
};

// Retrieve and return all users from the database.
/*exports.findAll = (req, res) => {
    User.find()
    .then(users => {
        res.send(users);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving users."
        });
    });
};*/

/*// Update a user identified by the id in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.description) {
        return res.status(400).send({
            message: "User description can not be empty"
        });
    }

    // Find user and update it with the request body
    User.findByIdAndUpdate(req.params.id, {
        title: req.body.name || "Untitled user",
        description: req.body.description
    }, {new: true})
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send(user);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "Error updating user with id " + req.params.id
        });
    });
};

// Delete a user with the specified id in the request
exports.delete = (req, res) => {
    User.findByIdAndRemove(req.params.id)
    .then(user => {
        if(!user) {
            return res.status(404).send({
                message: "User not found with id " + req.params.id
            });
        }
        res.send({message: "User deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "User not found with id " + req.params.user
            });                
        }
        return res.status(500).send({
            message: "Could not delete User with id " + req.params.id
        });
    });
};*/
