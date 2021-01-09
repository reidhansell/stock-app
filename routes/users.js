var express = require("express");
var router = express.Router();

const auth = require("../middleware/auth");

const User = require("../models/User");

// @route    POST api/users
// @desc     Login or register user
// @access   Public
router.post("/", async (req, res) => {
  const { name, email } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      res.json(user);
      return res;
    }

    user = new User({
      name,
      email
    });
    await user.save();
    res.json(user);
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
  try {
    const user = await User.findOne({ email: req.user.email });

    user.watchlist.unshift(stock);

    await user.save();

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    DELETE api/users/watchlist/:ticker
// @desc     Remove ticker from watchlist
// @access   Private
router.delete("/watchlist/:id", auth, async (req, res) => {
  try {
    console.log(req.params.id)
    const user = await User.findOne({ email: req.user.email });

    const stock = user.watchlist.find(x => {
      return x.id === req.params.id;
    });
    console.log(stock);
    await stock.remove();

    await user.save();

    res.json(user.watchlist);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// @route    PUT api/users/watchlist
// @desc     Add stock to watchlist
// @access   Private
router.put("/trades", auth, async (req, res) => {
  const { trade } = req.body;
  trade.date = new Date(Date.now());
  try {
    const user = await User.findOne({ email: req.user.email });

    user.trades.unshift(trade);

    if (trade.tradeType === "buy") {
      if (
        user.inventory.find(x => {
          return x.ticker === trade.ticker;
        })
      ) {
        user.inventory.find(x => {
          return x.ticker === trade.ticker;
        }).amount += trade.amount;
      } else {
        user.inventory.unshift({ ticker: trade.ticker, amount: trade.amount });
      }
      user.capital = user.capital - trade.amount * trade.price;
    } else if (trade.tradeType === "sell") {
      user.inventory.find(x => {
        return x.ticker === trade.ticker;
      }).amount -= trade.amount;
      user.capital = user.capital + trade.amount * trade.price;
    }

    await user.save();

    res.json(user);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;
