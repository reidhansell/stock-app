import axios from "axios";
// Login or register user
export const register = async (name, email) => {
  console.log("action entered");
  console.log("parameters:");
  console.log(name + " " + email);
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email });

  try {
    const res = await axios.post("/api/users", body, config);
    console.log("res.data: ");
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log("error");
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
    }
  }
};

// Add stock to watchlist
export const addToWatchlist = async stock => {
  console.log("action entered");
  console.log("parameters:");
  console.log(stock);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = {
      stock: stock
    };
    const res = await axios.put("/api/users/watchlist", body, config);
    console.log("res.data: ");
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};

// Remove ticker from watchlist
export const removeFromWatchlist = async ticker => {
  console.log("action entered");
  console.log("parameters:");
  console.log(ticker);
  try {
    const res = await axios.delete(`/api/users/watchlist/${ticker}`);

    console.log("res.data: ");
    console.log(res.data);
    return res.data;

    //dispatch(setAlert('Post Removed', 'success'));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};

// Add trade to trades
export const addToTrades = async trade => {
  console.log("action entered");
  console.log("parameters:");
  console.log(trade);
  try {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    };
    const body = {
      trade: trade
    };
    const res = await axios.put("/api/users/trades", body, config);
    console.log("res.data: ");
    console.log(res.data);
    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};
