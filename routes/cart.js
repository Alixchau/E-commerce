const Cart = require("../models/Cart");
const { route } = require("./auth");
const router = require("express").Router();
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("./verifyToken");

//CREATE
router.post("/new/:userId", verifyToken, async (req, res) => {
  const newCart= new Cart({userId: req.body.userId});
  // console.log(newCart);
  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (err) {
  //  console.log(req.body);
    //console.log(err);
    res.status(500).json(err);    
  }
});

//UPDATE
router.put("/:id", verifyToken,async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      {userId: req.body.body.userId},
      {
        $set: req.body.body, //accept all the data in the api body
      },
      {new: true} //return new cart instead of previous cart
    );
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id",  async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);
    res.status(200).json("Cart has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER CART 
router.get("/find/:userId",  async (req, res) => {
  try {
    const cart = await Cart.findOne({userId: req.params.userId});
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL cart of all users
router.get("/", verifyTokenAndAdmin, async (req,res)=>{
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);    
  }
});

module.exports = router;