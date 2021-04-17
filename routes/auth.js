const express=require("express")
const router=express.Router()
const { check } = require("express-validator");
const { signout, signup,signin } = require("../controllers/auth");


router.post(
    "/signup",
    [
      check("name", "name should be at least 3 char").isLength({ min: 2 }),
      check("email", "email is required").isEmail(),
      check("phoneNumber" , "provide a 10 digit phone number").isMobilePhone(),
      check("password", "password should be at least 3 char").isLength({ min: 3 })
    ],
    signup
  );


  router.get("/signout", signout);
  
  router.post(
    "/signin",
    [
      check("email", "email is required").isEmail(),
      check("password", "password field is required").isLength({ min: 3 })
    ],
    signin
  );
  
  module.exports = router