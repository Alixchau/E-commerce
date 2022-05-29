const router = require("express").Router();
const stripe = require("stripe")("sk_test_51L1ck6D2bTqVrtoS44GV0i0eT1f9IoIuAAc43TXz2SOUgYDFZQ5ivrcLqX2VewOQrQMifYsaxug3wtOxjCiqxZAo00o59l5Ayu");

router.post("/payment", (req,res) =>{
  //create a charge
  stripe.charges.create({
    source:req.body.tokenId,
    amount:req.body.amount,
    currency:"cad",
  },(stripeErr, stripeRes)=>{
    if(stripeErr){
      res.status(500).json(stripeErr);
    }else{
      res.status(200).json(stripeRes);
    }
  });
});
module.exports = router;