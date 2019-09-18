import React from "react";
import uuid from "uuid";

import Fade from "react-reveal/Fade";

const Main = props => {
  const user = props.user;
  return (
    <>
      <br />
      <h1 className="title is-1">{user.name}</h1><br />
      <h3 className="subtitle is-3">Stocks Owned:</h3>
      <ul>
        {user.inventory.length > 0
          ? user.inventory.map(x => {
              return x.amount > 0 ? (
                <li key={uuid.v4()}>
                  <h5 className="subtitle is-5">
                    {x.ticker} ({x.amount})
                  </h5>
                </li>
              ) : null;
            })
          : null}
      </ul>
      <br />
      <h3 className="subtitle is-3">Trade History:</h3>
      <Fade bottom cascade>
      <ul>
        {user.trades.length > 0
          ? user.trades.map(x => {
              return (
                <li
                  style={{
                    borderBottom: "1px solid gray",
                    color: x.tradeType === "buy" ? "green" : "red"
                  }}
                  key={uuid.v4()}
                >
                  {x.ticker}
                  <br />
                  {x.date.substring(0, 10)}
                  <br />
                  {x.tradeType.charAt(0).toUpperCase() + x.tradeType.slice(1)} (
                  {x.amount})
                  <br />
                  {x.price}
                </li>
              );
            })
          : null}
      </ul>
      </Fade>
      <br />
    </>
  );
};

export default Main;
