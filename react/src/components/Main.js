import React, { useState, useEffect } from "react";
import stocks from "stock-ticker-symbol";
import { addToWatchlist } from "../actions/user";
import { withRouter } from "react-router-dom";
import Stock from "./Stock";
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
  const [watchlist, setWatchlist] = useState(user.watchlist);
  const [loading, setLoading] = useState(false);
  const [net, setNet] = useState(0);

  console.log("USER IN MAIN: " + JSON.stringify(user));
  //https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=azIHEDZflMLwkJZM1Awu1MD0ed3fYZlGOwYSX9worzLjToLu7ONbNPYBxxA6

  useEffect(() => {
    const fetchData = async () => {
      //For debugging the query:

      /*console.log(
        "QUERY IN MAIN: https://api.worldtradingdata.com/api/v1/stock?symbol=" +
          watchlist.map(x => {
            return x;
          }) +
          ",.L&api_token=q24rdsKbfbnONlPNnBtPBAaJWBiwAu9vwS9lI8futWw4nqnvehZ0xTI0yw7x"
      );*/
      setNet(0);
      var newNet = 0;
      const result =
        watchlist.length > 0
          ? await fetch(
              "https://api.worldtradingdata.com/api/v1/stock?symbol=" +
                watchlist.map(x => {
                  return x;
                }) +
                ",.L&api_token=azIHEDZflMLwkJZM1Awu1MD0ed3fYZlGOwYSX9worzLjToLu7ONbNPYBxxA6"
            ).then(res => res.json())
          : null;
      if (result !== null) {
        sessionStorage.setItem("data", result.data);
        console.log("user.inventory: " + JSON.stringify(user.inventory));
        user.inventory.forEach(x => {
          console.log("x" + JSON.stringify(x));
          if (x.amount > 0) {
            newNet +=
              result.data.find(x2 => {
                console.log("x2" + JSON.stringify(x2));
                return x2.symbol === x.ticker;
              }) === null
                ? null
                : result.data.find(x2 => {
                    console.log("x2" + JSON.stringify(x2));
                    return x2.symbol === x.ticker;
                  }).price * x.amount;
          }
        });
      }
      setNet(user.capital + newNet);
      setData(result === null ? null : result.data);
    };

    fetchData();
  }, [watchlist, user]);

  const [search, setSearch] = useState("");

  const onClick = async ticker => {
    setSearch("");
    setLoading(true);
    const watchlist = await addToWatchlist(ticker);
    setWatchlist(watchlist);
    user.watchlist = watchlist;

    sessionStorage.setItem("user", JSON.stringify(user));
    setLoading(false);
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
          {search
            ? stocks.search(search).map(x => {
                return x.ticker.toLowerCase().includes("test") ? null : (
                  <li className="clickable" onClick={() => onClick(x.ticker)}>
                    {console.log(x)}
                    <small>{x.ticker + ": " + x.name}</small>
                  </li>
                );
              })
            : null}
          <br />
        </ul>
        <br />
        <h5 className="title is-5">Capital: ${user.capital.toFixed(2)}</h5>
        <h5 className="title is-5">Net: ${net === null ? 0 : net.toFixed(2)}</h5>
        <h5 className="title is-5">
          Profit/losses:{" "}
          <span style={{ color: 25000 - net >= 0 ? "green" : "red" }}>
            ${25000 - net.toFixed(2)}
          </span>
        </h5>
      </div>
      {loading ? <div id="spinner" style={{ margin: "auto" }} /> : null}
      {data
        ? data.map(x => {
            return (
              <Stock
                key={x.name}
                stock={x}
                user={user}
                updateUser={props.updateUser}
                setWatchlist={watchlist => setWatchlist(watchlist)}
              />
            );
          })
        : null}
    </>
  );
});

export default Main;
