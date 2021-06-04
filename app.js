const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');

const logger = require('morgan');
const mongoose = require("mongoose");
// const recipe = require("recipe");

mongoose
  .connect('mongodb://localhost:27017/express-mongodb-intro', {
  useNewUrlParser: true, //to turn off err msgs || you need to have these or else mongo will yell at you
  useUnifiedTopology: true, // to turn off err msgs || this must be in project
})
  .then(() => {
    console.log(`MONGO DB CONNECTED`);
  })
  .catch(function (e) {
    console.log(e); //returning promise that returns err if there's an err in connection 
  });

const indexRouter = require('./routes/index'); 
const usersRouter = require('./routes/users/usersRouter');
const productsRouter = require('/api/productsRouter'),

const app = express();

//middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); // parses cookies

app.use('/', indexRouter); // index router
app.use('/users', usersRouter); // users router
app.use('/api/products', productsRouter); // this is just a route that we created to reach a certain place

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404)); // if none match, it creates an err
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({message:'error', error: err});


});

module.exports = router;

