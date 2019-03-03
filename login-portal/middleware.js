// This file handles the logic of user's authentication state. 
const auth = require("./auth");

function addUser(req, res, next) {
  if (!req.userContext) {
    return next();
  }

// Once the user has been authenticated, save the user info.
auth.oktaClient.getUser(req.userContext.userinfo.sub)
    .then(user => {
      req.user = user;
      res.locals.user = user;
      next();
    }).catch(err => {
      next(err);
    });
};

// If the user tries to go to a page they have to be logged in for,
// they will get an unauthenticated page instead.
function loginRequired(req, res, next) {
  if (!req.user) {
    return res.status(401).render("unauthenticated");
  }
  next();
}

module.exports = { addUser, loginRequired}
