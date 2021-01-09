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
      ticker: { type: String, required: true },
      price: { type: String, required: true },
      amount: { type: Number, default: 1 }
    }
  ],
  watchlist: [{ name: { type: String }, ticker: { type: String } }],
  inventory: [
    {
      ticker: { type: String, required: true },
      amount: { type: Number, required: true }
    }
  ],
  capital: { type: Number, default: 25000 }
});

module.exports = User = mongoose.model("user", UserSchema);
