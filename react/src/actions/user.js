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
    await axios.put("/api/users/watchlist", body, config);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.log(errors);
    }
  }
};
