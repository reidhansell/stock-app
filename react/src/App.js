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
    isAuthenticated: sessionStorage.getItem("token") ? true : false,
    user: sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : null
  });

  //To be passed to child components
  const updateUser = user => {
    sessionStorage.setItem("user", JSON.stringify(user));
    setState({ ...state, user });
  };

  const { isAuthenticated, user } = state;
  //console.log("USER IN APP: " + JSON.stringify(user));

  if (sessionStorage.token) {
    setAuthToken(sessionStorage.token);
  }

  const responseGoogle = async response => {
    console.log(response);

    var user = await register(
      response.profileObj.name.toString(),
      response.profileObj.email.toString()
    );
    //console.log("USER IN APP.JS: " + user);

    setState({
      ...state,
      user: user,
      isAuthenticated: true
    });

    sessionStorage.setItem("token", response.tokenId);
    sessionStorage.setItem("user", JSON.stringify(user));

    //console.log("LOCAL: " + sessionStorage.getItem("user"));

    setAuthToken(sessionStorage.token);
  };

  const logout = () => {
    console.log("logout entered");
    sessionStorage.clear();
    setState({
      isAuthenticated: false,
      user: null
    });
  };

  return (
    <div className="App">
      <Router>
        <Nav
          responseGoogle={responseGoogle}
          isAuthenticated={isAuthenticated}
          logout={logout}
        />

        <div className="has-text-centered container">
          {isAuthenticated ? (
            <Route
              component={() => <Routes user={user} updateUser={updateUser} />}
            />
          ) : (
            <>
              <br />
              <h1 className="title is-1">STONKS</h1>
              <br />
              <h3 className="subtitle is-3">
                Welcome to Stonks, a paper-trading web application.
                <br />
                <br />
                Log in with Google to start tracking and paper-trading stocks
              </h3>
              <br />
              <h5 className="subtitle is-5">
                ! Only an email and your "trades" are saved in our database.
                Google handles the rest !
              </h5>
              <br />
              <GoogleLogin
                clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={"single_host_origin"}
              />

              <br />
              <br />
              <br />
              <small>
                Made by{" "}
                <a
                  href="https://www.reidhansell.com"
                  className="text-primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Reid Hansell
                </a>
              </small>
            </>
          )}
        </div>
      </Router>
    </div>
  );
}

export default App;
