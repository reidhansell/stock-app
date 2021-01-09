import React, { useState, useEffect } from "react";
import stocks from "stock-ticker-symbol";
import { addToWatchlist } from "../actions/user";
import { withRouter } from "react-router-dom";
import Stock from "./Stock";
import uuid from "uuid";

import Fade from "react-reveal/Fade";
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

/* = fetch(
  "https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=azIHEDZflMLwkJZM1Awu1MD0ed3fYZlGOwYSX9worzLjToLu7ONbNPYBxxA6"
)
  .then(function(response) {
    return response.json();
  })
  .catch(function() {
    alert("error fetching data");
  });

console.log(data);*/

const Main = withRouter(props => {
  const [data, setData] = useState([]);
  const user = props.user;
  const updateUser = props.updateUser;
  const { watchlist } = user;
  const [loading, setLoading] = useState(false);
  const [net, setNet] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      setNet(0);
      var newNet = 0;
      const result =
        watchlist.length > 0
          ? await fetch(
              "https://api.worldtradingdata.com/api/v1/stock?symbol=" +
                watchlist.map(x => {
                  return x.ticker;
                }) +
                ",.L&api_token=kTcRvj5BSriv9xcyfOaA2sQ24WSQx5orHw4FqMfctASEjjLGtbFIXHcfJ8FB"
            ).then(res => res.json())
          : null;
      if (result !== null) {
        sessionStorage.setItem("data", result.data);

        user.inventory.forEach(x => {
          if (x.amount > 0) {
            newNet +=
              result.data.find(x2 => {
                return x2.symbol === x.ticker;
              }) === null
                ? 0
                : result.data.find(x2 => {
                    return x2.symbol === x.ticker;
                  }).price * x.amount;
          }
        });
      }

      setNet(user.capital + newNet);
      setData(result === null ? null : result.data);
    };

    fetchData();

    return () => {};
  }, [watchlist, user]);

  const [search, setSearch] = useState("");

  const onClick = async stock => {
    setSearch("");
    setLoading(true);
    const watchlist = await addToWatchlist(stock);
    user.watchlist = watchlist;
    updateUser(user);
  };

  return (
    <>
      <br />
      <div style={{ margin: "10px" }}>
        <h5 className="title is-5">
          Search for a stock and select to add to your watchlist
        </h5>
        <input
          style={{ fontFamily: "Fjalla One, sans-serif" }}
          type="search"
          name="search"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <br />
        <ul style={{ borderBottom: "1px solid gray" }}>
          <br />
          {search
            ? stocks.search(search).map(x => {
                return x
                  .toString()
                  .match(
                    /^([0-9]|[a-z])+([0-9a-z]+)$/i
                  ) ? null : x.ticker.toLowerCase().includes("test") ? null : (
                  <li
                    key={uuid.v4()}
                    className="clickable"
                    onClick={() => onClick({ name: x.name, ticker: x.ticker })}
                  >
                    <small>{x.ticker + ": " + x.name}</small>
                  </li>
                );
              })
            : null}
          <br />
        </ul>
        <br />
        <h5 className="title is-5">Capital: ${user.capital.toFixed(2)}</h5>
        <h5 className="title is-5">
          Net: {net === 0 ? "Loading..." : "$" + net.toFixed(2)}
        </h5>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h5 className="title is-5" style={{ display: "flex" }}>
            Profit/losses:{" "}
            {net === 0 ? (
              <div id="spinner-extra-small" style={{ marginLeft: "5px" }} />
            ) : (
              <span
                style={{
                  color: net - 25000 >= 0 ? "green" : "red",
                  marginLeft: "5px"
                }}
              >
                ${(net - 25000).toFixed(2)}
              </span>
            )}
          </h5>
        </div>
        {loading ? (
          <div
            className="box"
            style={{ margin: "20px", backgroundColor: "hsl(60, 1%, 14%)" }}
          >
            <div
              id="spinner"
              style={{ margin: "auto", marginBottom: "20px" }}
            />
          </div>
        ) : null}
        <Fade cascade>
          <ul>
            {user.watchlist.map(x => {
              console.log(x._id);
              return (
                <li key={uuid.v4()}>
                  <Stock
                    stock={
                      data && data.length > 0
                        ? {...data.find(x2 => {
                            return x2.symbol === x.ticker;
                          }), id: x._id}
                        : { name: x.name, symbol: x.ticker, id: x._id }
                    }
                    user={user}
                    updateUser={props.updateUser}
                  />
                </li>
              );
            })}
          </ul>
        </Fade>
      </div>
    </>
  );
});

export default Main;
