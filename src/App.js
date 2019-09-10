import React from "react";
import key from "./config/key.json";
import "./App.css";
import "bulma/css/bulma.css";

import Nav from "./components/Nav";
import Main from "./components/Main";

/*var data = fetch(
  "https://api.worldtradingdata.com/api/v1/stock?symbol=AAPL,MSFT,HSBA.L&api_token=azIHEDZflMLwkJZM1Awu1MD0ed3fYZlGOwYSX9worzLjToLu7ONbNPYBxxA6"
)
  .then(function(response) {
    return response.json();
  })
  .catch(function() {
    alert("error fetching data");
  });

data ? console.log(data) : null;*/

function App() {
  return (
    <div className="App container">
      <Nav />
      <Main />
    </div>
  );
}

export default App;
