import axios from "axios";
// Register User
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
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.log(errors);
    }
  }
};
