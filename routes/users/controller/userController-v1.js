//User is coming from mongoDB schema
// in human terms - a template to create a user

const User = require('../model/User');
const bcrypt = require("bcryptjs"); // this is requiring the bcrypt library


//exporting an object with key and value
//getAllUsers = key || function = value here


module.exports = {
    getAllUsers: function (callback) { //
        // User.find({}) (empty object is to grab all the users)is a mongoose func to query the database
        //takes in a callback that returns 2 params 1)err , 2) payload = data
        User.find({}, function(err, payload) { //payload = data
            //user.find will give back 2 things: either err or payload data

            if(err) { //if there is an error, run the err msg on the callback func
                callback(err, null); // err is an object with the message displaying err \\ if err is null, it does not run error func
            } else {
                callback(null, payload); // both callbacks are the same funcs, but the arguments being passed in is what makes them different
            }
        });
    },
    createUser: function (body, callback) { //accepts 2 arguments || body comes from POST req
        bcrypt.genSalt(10, function (err, salt) {
            if(err) {
                bcrypt.hash(body.password, salt,function (err, hash) {
                    if (err) {
                        callback(err, null);
                    } else {
                        //create a mongodb user OBJECT that will assign a unique ID for the user
                        //WHAT IF THERE ARE OTHER CHECKS I HAVE TO DO INSIDE THIS BLOCK 
                        //
                    }
                })
            }
        })
        let createdUser = new User({ // this refers to the createdUser down below
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: body.password,
            username: body.username,
        });
    
        createdUser.save(function (err, payload) { //createdUser.save (function) saves it to the database || will assign a unique ID for the user
            console.log('err');
            if (err) {
                callback(err, null);
            } else {
                callback(null, payload);
            }
        });
    }

    updateUserByID: function (id, body, callback) {
        User.findByIdAndUpdate({ _id: id}, body, {new:true}, function(err, updatedPayload) { //new: true is a key phrase that needs to be there to update to the updated version | if it's not there, it's automatically F and refers back to the old version
            if (err) {
                callback(err, null);
            } else {
                callback(null, updatedPayload); //if there is no err (null), run the callback func and display updatedPayload
            };
        });
    },

    deleteUserByID: function(id, callback) {

        user.findByIdAndRemove({ _id: id }, function (err, deletedPayload) { // the underscore id is mongoDB's syntax of calling an ID | user.findByIdAndRemove is the a function method in mongoose | if you do not have mongoose required, it won't read it 
            if (err) {
                callback(err, null);
            } else {
                callback(null, deletedPayload);
            }
        }); 
    },
};

