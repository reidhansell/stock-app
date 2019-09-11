import React, { useState } from "react";
import stocks from "stock-ticker-symbol";
import { addToWatchlist } from "../actions/user";

const Main = () => {
  const stock = "apple";

  const [search, setSearch] = useState("");

  const onClick = stock => {
    addToWatchlist(stock);
    setSearch("");
  };

  return (
    <>
      <input
        type="search"
        name="search"
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {search ? stocks.search(search).map(x => {
        return (
          <h5 className="clickable" onClick={() => onClick(x.ticker)}>
            {console.log(x)}
            {x.ticker + ": " + x.name}
          </h5>
        );
      }) : null}
    </>
  );
};

export default Main;
