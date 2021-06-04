//version 3: cleanest code
// we generally want to be building this kind of clean code --> building this kind of code will be the most readable and best kind to work on a team [however, learning less newer/cleaner versions may be used sometimes so we need to know. The cleaner we write code, the better developers we will become bc we will know how to build more efficiently.]

var express = require("express");
var router = express.Router();


//bring in the User controller
var {
  getAllUsers,
  createUser,
  updateUserByID,
  deleteUserByID,
} = require("./controller/userController");


/* GET users listing. */
router.get("/", function (req, res, next) {
  res.json({
    test: true,
  });
});
router.get("/get-all-users", async function (req, res) {
  try {
    let foundAllUsers = await getAllUsers();
    res.json({ message: "success", foundAllUsers });
  } catch (error) {
    res.json({ message: "failure", error: error.message });
  }
});
router.post("/create-user", async function (req, res) {
  try {
    let createdUser = await createUser(req.body);
    res.json({ message: "success", createdUser });
  } catch (error) {
    res.json({ message: "failure", error: error.message });
  }
});
router.put("/update-user-by-id/:id", function (req, res) {});
router.delete("/delete-user-by-id/:id", function (req, res) {});
module.exports = router;


