var express = require("express");
var router = express.Router();

const User = require("../models/User");

// @route    POST api/users
// @desc     Register user
// @access   Public
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  console.log("Server entered with params:");
  console.log(name + " " + email);

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });
    }

    user = new User({
      name,
      email
    });

    await user.save();
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
