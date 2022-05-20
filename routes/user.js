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
router.delete("/:id", verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET USER (for admin)
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER (for admin)
router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new; //if query indicate new is true, only return first 5 users
  try {
    const users = query ? await User.find().sort({ _id: -1 }).limit(5) : User.find(); //sort id descending order
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS, total user number per month
router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        }
      }
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);

  }
});

module.exports = router;