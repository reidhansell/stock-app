import React from "react";
//import {key, secret} from "./config/key.json";
import "./App.css";
import "bulma/css/bulma.css";

import Nav from "./components/Nav";
import Main from "./components/Main";

//Key for API, secret for google login
//Once the app launches change secret to correct project configuration with google
//Fix readme to include secret

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

/*var data = fetch(
  "https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=azIHEDZflMLwkJZM1Awu1MD0ed3fYZlGOwYSX9worzLjToLu7ONbNPYBxxA6"
)
  .then(function(response) {
    return response.json();
  })
  .catch(function() {
    alert("error fetching data");
  });

console.log(data);*/



function App() {
  return (
    <div className="App container">
      <Nav />
      <Main />
    </div>
  );
}

export default App;
