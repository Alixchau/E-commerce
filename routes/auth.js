const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");

//REGISTER
router.post("/register", async (req,res)=>{
  const newUser = new User({
    username:req.body.username,
    email:req.body.email,
    //encrypt password using crypto js
    password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASSPHRASE).toString(),
  });
  //save user to database
  try{
    const savedUser = await newUser.save();
    //201 successfully added
    res.status(201).json(savedUser);
  } catch(e){
    res.status(500).json(e);
  }
});

//LOGIN


module.exports = router;