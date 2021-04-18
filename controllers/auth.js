const User = require("../models/user");
const { validationResult } = require("express-validator");
var jwt = require("jsonwebtoken");
var expressJwt = require("express-jwt");

exports.signup = (req, res) => {
  const errors = validationResult(req);

  console.log(req.body)
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }

  const user = new User(req.body);
  user.save((err, user) => {
    if (err) {
      return res.status(400).json({
        error_message: "could not save the user data",
      });
    }
    res.json({
      name: user.name,
      email: user.email,
    });
  });
};

exports.signin = (req, res) => {
  const { phoneNumber, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  User.findOne({ phoneNumber }, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: "user phone number does not exist",
      });
    }
    if (!user.authenticate(password)) {
      return res.status(401).json({
        error: " phone number and password doesnot match",
      });
    }
    //creating token
    const token = jwt.sign({ _id: user._id }, process.env.SECRET);
    //put token in cookie
    res.cookie("token", token, { expire: new Date() + 9999 });
    const { _id, name,phoneNumber, email, role } = user;

    return res.json({ token, user: { _id, name,phoneNumber,email, role } });
  });
};

exports.signout = (req, res) => {
  res.clearCookie("token");
  res.json({
    message: "user signout",
  });
};

//protected routes
exports.isSignedIn = expressJwt({
  secret: process.env.SECRET,
  userProperty: "auth",
});

//custom middlewares
exports.isAuthenticated = (req, res, next) => {
  let checker = req.profile && req.auth && req.profile._id == req.auth._id;
  if (!checker) {
    return res.status(403).json({
      error: "access denied",
    });
  }
  next();
};

exports.isAdmin = (req, res, next) => {
  if (req.profile.role === 0) {
    return res.status(403).json({
      error: "Your are our user,not an admin",
    });
  }
  next();
};