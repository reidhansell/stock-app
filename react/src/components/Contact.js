import React from "react";

const Main = () => {
  return (
    <>
      <br />
      <h1 className="title is-1">Contact</h1>
      <br />
      <h3 className="title is-3">Reid Hansell</h3>
      <br />
      <h5 className="subtitle is-5">ReidHansell@Gmail.com</h5>
      <h5 className="subtitle is-5">
        {" "}
        <a
          href="https://www.reidhansell.com"
          className="text-primary"
          target="_blank"
          rel="noopener noreferrer"
        >
          ReidHansell.com
        </a>
      </h5>
    </>
  );
};

export default Main;
