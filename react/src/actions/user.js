import axios from "axios";
// Login or register user
export const register = async (name, email) => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({ name, email });

  try {
    const res = await axios.post("/api/users", body, config);

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      alert(errors);
    }
  }
};

// Add stock to watchlist
export const addToWatchlist = async stock => {
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

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      alert(errors);
    }
  }
};

// Remove ticker from watchlist
export const removeFromWatchlist = async ticker => {
  try {
    const res = await axios.delete(`/api/users/watchlist/${ticker}`);

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      alert(errors);
    }
  }
};

// Add trade to trades
export const addToTrades = async trade => {
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

    return res.data;
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      alert(errors);
    }
  }
};
