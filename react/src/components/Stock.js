import React, { useState } from "react";

import { removeFromWatchlist, addToTrades } from "../actions/user";

/* Data example:
[
  { 52_week_high: "233.47",
    52_week_low: "142.00",
    change_pct: "1.18",
    close_yesterday: "214.17",
    currency: "USD",
    day_change: "2.53",
    day_high: "216.78",
    day_low: "211.71",
    gmt_offset: "-14400",
    last_trade_time: "2019-09-10 16:00:01",
    market_cap: "958550769664",
    name: "Apple Inc.",
    price: "216.70",
    price_open: "213.86",
    shares: "4519179776",
    stock_exchange_long: "NASDAQ Stock Exchange",
    stock_exchange_short: "NASDAQ",
    symbol: "AAPL",
    timezone: "EDT",
    timezone_name: "America/New_York",
    volume: "28279867",
    volume_avg: "21956480"}
]*/

const Stock = props => {
  const stock = props.stock;
  const setWatchlist = props.setWatchlist;
  const user = props.user;
  const updateUser = props.updateUser;
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(1);

  const verifyTrade = async trade => {
    if (trade.tradeType === "sell") {
      if (
        user.inventory.find(x => {
          return x.ticker === stock.symbol && x.amount >= trade.amount;
        })
      ) {
        updateUser(await addToTrades(trade));
      }
    } else {
      if (user.capital >= trade.price * trade.amount) {
        updateUser(await addToTrades(trade));
      }
    }
  };

  const onClick = async ticker => {
    if (
      user.inventory.find(x => {
        return x.ticker === stock.symbol && x.amount > 0;
      })
    ) {
      return;
    } else {
      setLoading(true);
      const watchlist = await removeFromWatchlist(ticker);
      setWatchlist(watchlist);
      user.watchlist = watchlist;

      sessionStorage.setItem("user", JSON.stringify(user));
    }
  };

  return loading ? (
    <div id="spinner" style={{ margin: "auto" }} />
  ) : (
    <div className="box" style={{ margin: "20px" }}>
      <h3 className="columns is-mobile title is-3">
        <div className="column is-11" style={{ paddingLeft: "10%" }}>
          {stock.name}
        </div>
        <div
          className="column clickable has-text-right is-1"
          onClick={() => onClick(stock.symbol)}
        >
          <small>x</small>
        </div>
      </h3>
      <h5 className="subtitle is-5">
        Price: {stock.price}
        <br />
        Owned:{" "}
        {user.inventory.find(x => {
          return x.ticker === stock.symbol;
        })
          ? user.inventory.find(x => {
              return x.ticker === stock.symbol;
            }).amount
          : 0}
      </h5>
      <button className="button" onClick={() => setAmount(amount + 1)}>
        +
      </button>
      <span style={{ fontSize: "18pt", margin: "10px" }}>{amount}</span>
      <button
        className="button"
        onClick={() => setAmount(amount - 1 > 1 ? amount - 1 : 1)}
        style={{ marginRight: "15px" }}
      >
        -
      </button>
      <button
        className="button"
        onClick={async () =>
          verifyTrade({
            tradeType: "buy",
            ticker: stock.symbol,
            price: stock.price,
            amount: amount
          })
        }
        style={{
          marginLeft: "15px",
          marginRight: "5px",
          backgroundColor: "green",
          color: "white"
        }}
      >
        Buy
      </button>
      <button
        className="button"
        onClick={async () =>
          verifyTrade({
            tradeType: "sell",
            ticker: stock.symbol,
            price: stock.price,
            amount: amount
          })
        }
        style={{
          marginLeft: "5px",
          marginRight: "10px",
          backgroundColor: "red",
          color: "white"
        }}
      >
        Sell
      </button>
    </div>
  );
};

export default Stock;
