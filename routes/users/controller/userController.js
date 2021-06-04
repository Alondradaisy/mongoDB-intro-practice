//current version 6/2
//User is coming from mongoDB Schema
//in human term - a template to create a user
const User = require("../model/User");
//hashing password library
const bcrypt = require("bcryptjs");
//exporting an object with key and value
async function getAllUsers(req, res) {
    try {
        let foundAllUsers = await User.find({});
        res.json({ message: "success", data: foundAllUsers });
    } catch (e) {
        res.status(500).json({ message: "failure", error: e.message }); //err msg (e)
    }
},

async function createUser(req, res) {
    const { password, firstName, lastName, email, username } = req.body;
    try {
        let createdSalt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, createdSalt);
        let newUser = new User({ //create the newUser 
            firstName,
            lastName,
            email,
            username,
            password: hashedPassword,
        });
        let savedUser = await newUser.save();
        res.json({ message: "success", data: savedUser });
    } catch (e) { 
        res.status(500).json({ message: "failure", error: e.message });
    }
},

async function updateUserByID(req, res) {
    const id = req.params.id;
    try {
        let updatedUser = await User.findByIdAndUpdate({ _id: id }, req.body, {
            new: true,
        });
        res.json({ message: "success", data: updatedUser });
    } catch (e) {
        res.status(500).json({ message: "failure", error: e.message });
    }
},

async function deleteUserByID(req, res) {
    const id = req.params.id;
    try {
        let deletedUser = await User.findByIdAndRemove({ _id: id });
        res.json({ message: "success", data: deletedUser });
    } catch (e) {
        res.status(500).json({ message: "failure", error: e.message });
    }
}
module.exports = {
    getAllUsers,
    createUser,
    updateUserByID,
    deleteUserByID,
};