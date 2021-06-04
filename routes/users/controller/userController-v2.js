//User is coming from mongoDB schema
// in human terms - a template to create a user

const User = require('../model/User');
const bcrypt = require("bcryptjs"); // this is requiring the bcrypt library
const { update } = require('../model/User');


//exporting an object with key and value
//getAllUsers = key || function = value here


module.exports = {
    getAllUsers: function () { 
        
        return new Promise((resolve, reject) => { //we'll be working with Promise syntax to get cleaner code || the importance is getting to a point where we know versions, but ultimately write cleaner and clearer code. || resolve and reject are placeholder arguments, but will always mean 'successful' and 'failure'. 
            
            // unlike the callback version, Promise uses resolve before failure, so it makes sure that it's successful before determining if it's not --> resolve -> reject
            //\\ if successful, .then display data: payload, if rejected (failed), .catch the error and display
            User.find({}) // 
            .then((payload) => { // if successful, display the resolved/successful data
                resolve(payload);  
            })
            .catch((error) => { //the error msg will display in the router res.status ||
                // userController and userRouter work together, so the error msg will show over there 
                reject(error);
            });
            
        });
    },
    createUser: function(body) { //wrapping Promise for this entrie func
        updateUserById: function(body) {
            return new Promise((resolve, reject) => {
                bcrypt
                .genSalt(10) //the number here marks the time it will take to process
                .then((salt) => { //we no longer have to use callback || this spits back result of salt func
                    return bcrypt.hash(body.password, salt); //calling bcrypt.hash(body.password) (the hashed password)
                })
                .then((hashedPassword) => { //spits out the data from the previous .then return block
                    let createdUser = new User({ // this refers to the createdUser down below
                        firstName: body.firstName,
                        lastName: body.lastName,
                        email: body.email,
                        password: body.password,
                        username: body.username,
                    });
                    return createdUser.save();
                })
                .then((createdUser) => {
                    resolve(createdUser); //when resolved is called, it's going to jump to then next .then sequence
                })
                .catch((error) => {
                    reject(error);
                });
            })
        }
        
        updateUserByID: function (id, body) {
            return new Promise((resolve, reject) => 
            User.findByIdAndUpdate({ _id:id }, body, 
                {new: true}) 
                .then((updatedUser) => resolve(updatedUser))
                .catch((error) => reject(error));
                );
            }
            
            
        deleteUserByID: function (id) {
            return new Promise((resolve, reject) => {
                User.findByIdAndRemove({ _id: id })
                .then((deletedUser) => resolve(deletedUser))
                .catch((error) => reject(error));
            });
        },