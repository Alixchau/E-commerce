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

module.exports = router;