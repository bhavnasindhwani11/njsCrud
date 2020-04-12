"use strict";
var createError = require('http-errors');
var express = require('express');
var app = express();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var debug = require('debug')('njscrud');

var postRouter = require('./routes/post');
var authRoutes = require('./routes/User');
var commentRoutes = require('./routes/comment');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  name:'login',
  resave:false,
  saveUninitialized:false,
  secret:"its_a_secret",
  cookie :{
      maxAge:7200000,
      sameSite:true,
      secure:false,// in production its false on live its true
  }
}));
app.use(authRoutes);
app.use(postRouter);
app.use(commentRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  //res.render('error');
  debug(err.message);
});

module.exports = app;
