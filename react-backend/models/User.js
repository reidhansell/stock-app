const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  trades: [
    {
      tradeType: { type: String, required: true }, //BUY OR SELL
      date: { type: Date, default: Date.now },
      name: { type: String, required: true },
      price: { type: String, required: true },
      amount: { type: String, default: "1" }
    }
  ],
  watchlist: [String]
});

module.exports = User = mongoose.model("user", UserSchema);
