import React from "react";
import uuid from "uuid";

const Main = props => {
  const user = props.user;
  return (
    <>
      <br />
      <h1 className="title is-1">{user.name}</h1>
      <h3 className="subtitle is-3">Trade history:</h3>
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
                  {x.tradeType} ({x.amount})
                  <br />
                  {x.price}
                </li>
              );
            })
          : null}
      </ul>
    </>
  );
};

export default Main;
