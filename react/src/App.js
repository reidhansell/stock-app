import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import "./App.css";
import "bulma/css/bulma.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Routes from "./components/Routes";

import Nav from "./components/Nav";
import { register } from "./actions/user";
import setAuthToken from "./utils/setAuthToken";

function App() {
  
  const [state, setState] = useState({
    isAuthenticated: localStorage.getItem("token") ? true : false,
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  });

  const { isAuthenticated, user } = state;
  console.log("USER IN APP: " + JSON.stringify(user));

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const responseGoogle = async response => {
    console.log(response);

    var user = await register("test", response.profileObj.email.toString());
    console.log("USER IN APP.JS: " + user);

    setState({
      ...state,
      user: user,
      isAuthenticated: true
    });

    localStorage.setItem("token", response.tokenId);
    localStorage.setItem("user", JSON.stringify(user));

    console.log("LOCAL: " + localStorage.getItem("user"));

    setAuthToken(localStorage.token);
  };

  const logout = () => {
    console.log("logout entered");
    localStorage.clear();
    setState({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <div className="App container">
      <Router>
        <Nav
          responseGoogle={responseGoogle}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />

        <div className="has-text-centered">
          {isAuthenticated ? (
            <Route component={() => <Routes user={user} />} />
          ) : (
            <>
              <h1 className="title is-1">Stonks</h1>
              <br />
              <h3 className="subtitle is-3">
                Welcome to stonks, a paper-trading web application
                <br />
                <br />
                Log in with Google to start tracking and paper-trading stocks.
              </h3>
              <br />
              <GoogleLogin
                clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />
            </>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
