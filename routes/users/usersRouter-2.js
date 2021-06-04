//this is the least clean of the code that we've gone over
var express = require('express');
var router = express.Router();

const { getAllUsers, createUser, updateUserByID, deleteUserByID } = require('./controller/userController');
const { updateUserByID } = require('./controller/userController-v1');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    test: true,
  });
});


router.get('/get-all-users', function (req, res) {
  getAllUsers()
  .then((payload) => {
    res.json({ message: "success", data: payload });
  })
  .catch((error) => {
    res.status(500).res.json({ message: "error", error: error.message });
  });
});

router.post('/create-user', function(req, res)  {
  createUser(req.body)  // this refers to Promise in userController
  .then((payload) => {
    res.json({ message: "success", data: payload});
  }) 
  .catch((error) => {
    res.status(500).json({ message: "error", error });
  })
});

router.put('/update-user-by-id/:id', function(req, res) {
  updateUserByID(req.params.id, req.body)
  .then((updatedUser) => res.json({ message: "success", updatedUser }))
  .catch((error) => 
  res.status(500).json({ message: "error", error, })
  
  )}
  
  
  router.delete("/delete-user-by-id/:id",function(req, res) {
    deleteUserByID(req.params.id)
    .then((deletedUser) => res.json({ message: "success", deletedUser }))
    .catch((error) =>
    res.status(500).json({ message: "error", error: error.message })
    );
  });
);

module.exports = router;
