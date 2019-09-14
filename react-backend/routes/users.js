var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");

const User = require("../models/User");

// @route    POST api/users
// @desc     Login or register user
// @access   Public
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  console.log("Server entered with params:");
  console.log(name + " " + email);

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.json(user);
      console.log(user);
      return res;
    }

    user = new User({
      name,
      email
    });
    await user.save();
    res.json(user);

    console.log(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// @route    PUT api/users/watchlist
// @desc     Add stock to watchlist
// @access   Private
router.put("/watchlist", auth, async (req, res) => {
  const { stock } = req.body;
  console.log("Server entered with params:");
  console.log(stock);

  console.log(req.user.email);
  try {
    const user = await User.findOne({ email: req.user.email });

    user.watchlist.unshift(stock);

    await user.save();

    res.json(user.watchlist);
    console.log(user.watchlist);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/watchlist/:ticker
// @desc     Remove ticker from watchlist
// @access   Private
router.delete("/watchlist/:ticker", auth, async (req, res) => {
  console.log("Server entered with params:");
  console.log(req.params.ticker);
  try {
    const user = await User.findOne({ email: req.user.email });

    await user.watchlist.pull(req.params.ticker);

    await user.save();

    res.json(user.watchlist);
    console.log(user.watchlist);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
