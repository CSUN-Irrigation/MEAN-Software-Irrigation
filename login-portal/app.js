/* TO RUN THIS APPLICATION:
 * Requirements:
 * - A .envrc file with the following variables:
 *    - export OKTA_ORG_URL=
 *    - export OKTA_TOKEN=
 *    - export OKTA_CLIENT_ID=
 *    - export OKTA_CLIENT_SECRET=
 *    - export SECRET=
 *    - export OKTA_APPBASEURL=
 *    - export OKTA_CALLBACK_URI=
 *  Please note: the above variables must be properly set (have the correct values)
 *
 * First time setup:
 *      1. Open a terminal and go into this application's directory.
 *      2. Type "npm install" then press Enter.
 *
 * On Windows:
 *      1. Open Cmder and go into this application's directory.
 *      2. Type "bash" then press Enter.
 *      3. Type ". .envrc" then press Enter.
 *      4. Type "npm start" then press Enter.
 *      5. Open a browser and go to localhost:3000
 *
 * On Linux:
 *      1. Open a terminal and go into this application's directory.
 *      2. If this is the first launch on your current machine type ". .envrc" then press Enter.
 *      3. Type "sudo npm start > ~/log &" then press Enter.
 *      Clarification on the above step: npm will start and have all output logged into a file called
 *      "log" then the ampersand tells the terminal to make it a background process.
 *      If it doesn't automatically become a background process just press "CTRL + Z" then type bg.
 *      4. Open a browser and go to localhost:3000
*/

// Imports.
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require("express-session");
var cookieParser = require('cookie-parser');

// Used for user authentication with Okta.
const auth = require("./auth");
const middleware = require("./middleware");

// Import Routing.
const dashboardRouter = require("./routes/dashboard");
const publicRouter = require("./routes/public");
const usersRouter = require("./routes/users");

var app = express();

// View engine setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Sets up the app.
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Allows users to naviagate the site while keeping their state as "logged in".
app.use(session({
  secret: process.env.SECRET,
  resave: true,
  saveUninitialized: false
}));

// Use the imported authorization service: Okta.
app.use(auth.oidc.router);
app.use(middleware.addUser);

// Enable routing.
app.use('/', publicRouter);
app.use('/dashboard', middleware.loginRequired, dashboardRouter);
app.use('/users', usersRouter);

// Catch 404 and forward to error handler.
app.use(function(req, res, next) {
  next(createError(404));
});

// Error handler.
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
