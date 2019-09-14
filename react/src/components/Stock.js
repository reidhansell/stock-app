import React, { useState } from "react";

import { removeFromWatchlist } from "../actions/user";

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
  const [loading, setLoading] = useState(false);

  const onClick = async ticker => {
    setLoading(true);
    const watchlist = await removeFromWatchlist(ticker);
    setWatchlist(watchlist);
    user.watchlist = watchlist;

    localStorage.setItem("user", JSON.stringify(user));
  };

  return loading ? (
    <div id="spinner" style={{ margin: "auto" }} />
  ) : (
    <div className="box" style={{ margin: "20px" }}>
      <h1 className="columns is-mobile">
        <div className="column is-11" style={{paddingLeft:"10%"}}>{stock.name}</div>
        <div
          className="column clickable has-text-right is-1"
          onClick={() => onClick(stock.symbol)}
        >
          X
        </div>
      </h1>
      <h3>Price: {stock.price}</h3>
      <h3>Price close yesterday: {stock.close_yesterday}</h3>
    </div>
  );
};

export default Stock;
