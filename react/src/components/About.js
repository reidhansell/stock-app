import React from "react";

const Main = () => {
  return (
    <>
      <br />
      <h1 className="title is-1">About</h1>
      <br />
      <h3 className="subtitle is-3">What?</h3>
      <p>Stonks is an app for paper trading</p>
      <br />
      <h3 className="subtitle is-3">How?</h3>
      <p>
        <a
          href="https://www.github.com/reidhansell/stock-app"
          className="text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Made with the MERN stack
        </a>
      </p>
      <br />
      <h3 className="subtitle is-3">Who?</h3>
      <p>
        My name is{" "}
        <a
          href="https://www.reidhansell.com"
          className="text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reid Hansell
        </a>
        , a web developer currently developing the skills to get into the
        industry. I like the stock market.
      </p>
    </>
  );
};

export default Main;
