import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";

const Nav = props => {
  const [open, setOpen] = useState(props.open || false);
  const { responseGoogle, isAuthenticated, logout } = props;
  return (
    <>
      <nav
        className="navbar"
        role="navigation"
        aria-label="main navigation"
        style={{ backgroundColor: "darkgray" }}
      >
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" onClick={() => setOpen(false)}>
            <h3 className="title is-3 clickable">Stonks</h3>
          </Link>

          <button
            style={{ background: "none", border: "none", outline: "none" }}
            className="navbar-burger burger clickable"
            onClick={() => setOpen(!open)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div
          id="navbarBasicExample"
          className={"navbar-menu " + (open ? "is-active" : null)}
          style={{ backgroundColor: "darkgray" }}
        >
          <div className="navbar-end">
            {isAuthenticated ? (
              <>
                <div className="navbar-item">
                  <Link to="/" onClick={() => setOpen(false)}>
                    <h5 className="subtitle is-5 clickable">Watchlist</h5>
                  </Link>
                </div>
                <div className="navbar-item">
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    <h5 className="subtitle is-5 clickable">Profile</h5>
                  </Link>
                </div>
              </>
            ) : null}
            <div className="navbar-item">
              <Link to="/about" onClick={() => setOpen(false)}>
                <h5 className="subtitle is-5 clickable">About</h5>
              </Link>
            </div>
            <div className="navbar-item">
              <Link to="/contact" onClick={() => setOpen(false)}>
                <h5 className="subtitle is-5 clickable">Contact</h5>
              </Link>
            </div>
            <div className="navbar-item">
              {isAuthenticated ? (
                <span onClick={() => setOpen(false)}>
                  <GoogleLogout
                    clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => logout()}
                  ></GoogleLogout>
                </span>
              ) : (
                <span onClick={() => setOpen(false)}>
                  <GoogleLogin
                    clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                    buttonText="Login"
                    onSuccess={responseGoogle}
                    onFailure={responseGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </span>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
