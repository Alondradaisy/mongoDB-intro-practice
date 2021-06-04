// this version is the least clean of the versions that we've covered
var express = require('express');
var router = express.Router();

const userController = require('./controller/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json({
    test: true,
  });
});


router.get('/get-all-users', function (req, res) {
  userController.getAllUsers(function (err, payload) {
    if (err) {  //if err = true (there is an err) send the status 500 error message || userController.js and usersRouter.js work together
      res.status(500).json({ message: 'Error', error: err}); //if null = no error, will not run err msg
    } else {
      res.json({ message: 'success', data: payload }); //you must put data: payload to mention that you are referring to the data that came in
    }
  });
});

router.post('/create-user', function(req, res)  {

  userController.createUser(req.body, function(err, payload) { //req.body is coming from the post request object {in this case the body of the createdUser}
    if(err) {
      res.status(500).json({ message: "Error", error: err });
    } else {
      res.json({ message: "success", data: payload });
    }
  });
});

router.put('/update-user-by-id/:id', function(req, res) {
  userController.updateUserByID(
    req.params.id,
    req.body,
    function (err, updatedPayload) {
      if (err) {
        res.status(500).json({ message: "Error", error: err });
      } else {
        res.json({ message: "success", data: updatedPayload });
      }
    }
  );

router.delete("/delete-user-by-id/:id",function(req, res) {
  userController.deleteUserByID(req.params.id, function (err, deletedPayload) {
    if(err) {
      res.status(500).json({ message: "Error", error: err });
  
    } else {
      res.json({ message: "success", data: deletedPayload });
    }
  });
});

});
module.exports = router;
