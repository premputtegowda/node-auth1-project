const bcrypt = require("bcryptjs");

const Users = require("../users/user-model.js");

module.exports = (req, res, next) => {
  if (req.session && reg.loggedIn) {
      next();
  } else {
    res.status(401).json({error: "need to login before you can access this app"})
  }
};
