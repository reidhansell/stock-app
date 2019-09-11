import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import "./App.css";
import "bulma/css/bulma.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./components/Routes";

import Nav from "./components/Nav";
import { register } from "./actions/user";
import setAuthToken from "./utils/setAuthToken";

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
  const [state, setState] = useState({
    isAuthenticated: localStorage.token ? true : false,
    user: localStorage.user || null
  });

  const { isAuthenticated /*user*/ } = state;

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const responseGoogle = response => {
    console.log(response);

    var user = register("test", response.profileObj.email.toString());

    setState({
      ...state,
      user: user,
      isAuthenticated: true
    });

    localStorage.setItem("token", response.tokenId);
    localStorage.setItem("user", user);

    setAuthToken(localStorage.token);
  };

  const logout = () => {
    console.log("logout entered");
    localStorage.clear();
    setState({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <div className="App container">
      <Router>
        <Nav
          responseGoogle={responseGoogle}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />

        <div className="has-text-centered">
          {isAuthenticated ? (
            <Route component={Routes} />
          ) : (
            <GoogleLogin
              clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
