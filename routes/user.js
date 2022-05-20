const User = require("../models/User");
const router = require("express").Router();
const {
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin
} = require("./verifyToken");

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) { //if user wants to update password, encrypt it again
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_PASSPHRASE
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body, //accepts all from body
      },
      { new: true } //return object to updateUser
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete("/:id", verifyTokenAndAuthorization, async (req, res)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;