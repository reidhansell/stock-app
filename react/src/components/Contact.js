import React from "react";

const Main = () => {
  return (
    <>
      <div className="container" style={{ maxWidth: "600px" }}>
        <br />
        <h1 className="title is-1">Contact</h1>
        <br />
        <h3 className="title is-3">
          <a
            href="https://www.reidhansell.com"
            className="text-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            ReidHansell.com
          </a>
        </h3>
        <h5 className="subtitle is-5">ReidHansell@Gmail.com</h5>
        <p className="has-text-left">
          Want to collaborate, see a new feature added, or report a bug? Send an
          email to the address above and I'll get back to you as soon as
          possible.
        </p>
      </div>
    </>
  );
};

export default Main;
