const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) =>{
  const authHeader = req.headers.token;
  if(authHeader){//if token exist, verify it with env secret key, return error or user data after verification
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, user)=>{
      if(err) {
        res.status(401).json("Token is not valid!");
      }else{
        req.user = user;
        next(); //leave this function
      }
    })
  }else{
    return res.status(401).json("You are not authenticated!");
  }
};

const verifyTokenAndAuthorization = (req, res, next) =>{
  verifyToken(req, res,()=>{
    if(req.user.id === req.params.id || req.user.isAdmin){
      next();
    }else{
      res.status(403).json("You are not Authorized!");
    }
  });
};

const verifyTokenAndAdmin = (req, res, next) =>{
  verifyToken(req, res,()=>{
    if(req.user.isAdmin){
      next();
    }else{
      res.status(403).json("You are not Authorized!");
    }
  });
};

module.exports = {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin};