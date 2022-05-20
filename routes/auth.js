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
router.post("/login", async(req,res)=>{
  try{
    const user = await User.findOne({username:req.body.username});
    !user && res.status(401).json("Wrong username!"); //if user not found

    const originalPassword = CryptoJS.AES.decrypt(user.password, process.env.SECRET_PASSPHRASE).toString(CryptoJS.enc.Utf8);
    originalPassword !== req.body.password && res.status(401).json("Wrong credentials!"); //if password doesn't match

    const {password, ...others} = user._doc; 
    res.status(200).json(others); //only send info that's not password 
  }catch(error){
    res.status(500).json(error);
  }
})


module.exports = router;