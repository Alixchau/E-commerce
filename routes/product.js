const Product = require("../models/Product");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("./verifyToken");

//CREATE
router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);    
  }
});

//UPDATE
router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //accepts all from body
      },
      { new: true } //return object to updateUser
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET Product 
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL Product 
router.get("/",  async (req, res) => {
  const queryNew = req.query.new; //if query indicate new is true, only return first 5 products
  const queryCategory = req.query.category;
  try {
    var products;
    if(queryNew){
      products = await Product.find().sort({createdAt: -1}).limit(1);
    }else if(queryCategory){
      products = await Product.find({
        categories:{
          $in: [queryCategory],
        },
      });
    }else{
      products = await Product.find();
    }
    res.status(200).json(products);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;