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
    const res = await axios.post("/api/users/", body, config);

    return res;
  } catch (err) {
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
    await axios.put("/api/users/watchlist", stock, config);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};
