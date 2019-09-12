import React, { useState, useEffect } from "react";
import stocks from "stock-ticker-symbol";
import { addToWatchlist } from "../actions/user";

import { withRouter } from "react-router-dom";

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
  console.log("USER IN MAIN: " + JSON.stringify(user));
  //https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=q24rdsKbfbnONlPNnBtPBAaJWBiwAu9vwS9lI8futWw4nqnvehZ0xTI0yw7x
  useEffect(() => {
    const fetchData = async () => {
      console.log(
        "QUERY IN MAIN: https://api.worldtradingdata.com/api/v1/stock?symbol=" +
          user.watchlist.map(x => {
            return x;
          }) +
          ".L&api_token=q24rdsKbfbnONlPNnBtPBAaJWBiwAu9vwS9lI8futWw4nqnvehZ0xTI0yw7x"
      );
      const result = await fetch(
        "https://api.worldtradingdata.com/api/v1/stock?symbol=" +
          user.watchlist.map(x => {
            return x;
          }) +
          ".L&api_token=q24rdsKbfbnONlPNnBtPBAaJWBiwAu9vwS9lI8futWw4nqnvehZ0xTI0yw7x"
      ).then(res => res.json());
      console.log("RESULT: " + JSON.stringify(result));
      setData(result.data);
    };

    fetchData();
  }, [user]);

  const [search, setSearch] = useState("");

  const onClick = stock => {
    addToWatchlist(stock);
    setSearch("");
  };

  return (
    <>
      <br />
      <div className="box" style={{ margin: "10px" }}>
        <h5 className="subtitle is-5">
          Search for a stock and select it to add to your watchlist
        </h5>
        <input
          style={{ fontFamily: "Fjalla One, sans-serif" }}
          type="search"
          name="search"
          placeholder="Search..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {search
          ? stocks.search(search).map(x => {
              return (
                <h5 className="clickable" onClick={() => onClick(x.ticker)}>
                  {console.log(x)}
                  {x.ticker + ": " + x.name}
                </h5>
              );
            })
          : null}
      </div>
      {data ? (
        data.map(x => {
          return <h1 key={x.name}>{x.name}</h1>;
        })
      ) : (
        <div id="spinner" style={{ margin: "auto" }} />
      )}
    </>
  );
});

export default Main;
