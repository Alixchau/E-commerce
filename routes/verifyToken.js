const jwt = require("jsonwebtoken");


const verifyToken = (req, res, next) =>{
  const authHeader = req.headers.token;
  if(authHeader){//if token exist, verify it with env secret key, return error or user data after verification
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      if(err) {
        res.status(403).json("Token is not valid!");
      }else{
        req.user = user;
        //console.log("veryifyToken +" + req.user);
        next(); //leave this function
      }
    })
  }else{
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) =>{

  verifyToken(req, res,()=>{
    console.log(req);
    if(req.user.id === req.params.userId || req.user.isAdmin){
    //  console.log(res);
      next();
    }else{
    //  console.log("req.user.id " + req.user.id);
     // console.log(req.params.userId);
      //console.log(req.user.isAdmin);
      res.status(403).json("You are not alowed to do that!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) =>{
  verifyToken(req, res,()=>{
    if(req.user.isAdmin){
      next();
    }else{
      res.status(403).json("Admin access only!");
    }
  });
};


module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};