import React from "react";

const Main = () => {
  return (
    <>
      <br />
      <div style={{ maxWidth: "600px", margin: "auto" }}>
        <h1 className="title is-1">About</h1>
        <br />
        <h3 className="subtitle is-3">What?</h3>
        <p style={{ textAlign: "left" }}>
          Stonks is an app for paper trading. The money and trades are all on paper but the stocks are real with
          up-to-date prices from worldtradingdata.com. You are given $25,000 to
          start with, see how much you can profit! Your trade history can be
          found in your profile
        </p>
        <br />
        <h3 className="subtitle is-3">How?</h3>
        <p style={{ textAlign: "left" }}>
          <a
            href="https://www.github.com/reidhansell/stock-app"
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Made with the MERN stack.
          </a>{" "}
          No sensitive data is stored in our database, only an email and your
          "trades." Google handles the rest
        </p>
        <br />
        <h3 className="subtitle is-3">Who?</h3>
        <p style={{ textAlign: "left" }}>
          My name is{" "}
          <a
            href="https://www.reidhansell.com"
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reid Hansell
          </a>
          , a software developer currently seeking opportunity to use my skills in a professional capacity. I am passionate about the stock market and hope to turn
          Stonks into a platform for beginners to get into the stock market. I
          hope that seeing potential profits will motivate others to invest
        </p>
      </div>
    </>
  );
};

export default Main;
