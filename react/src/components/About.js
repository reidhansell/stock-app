import React from "react";

import { addToWatchlist } from "../actions/user";

const Main = () => {
  const stock = "apple";

  return (
    <>
      <button onClick={() => addToWatchlist(stock)}>Test2</button>
    </>
  );
};

export default Main;