import React, { useState } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";

const Nav = props => {
  const [open, setOpen] = useState(props.open || false);
  const { responseGoogle, isAuthenticated, logout } = props;
  return (
    <nav
      className="navbar"
      role="navigation"
      aria-label="main navigation"
      style={{ backgroundColor: "hsl(60, 1%, 14%)" }}
    >
      {isAuthenticated ? (
        <>
          <div className="navbar-brand">
            <Link to="/" className="navbar-item" onClick={() => setOpen(false)}>
              <h3
                className="title is-3"
                style={{ color: "hsl(204, 33%, 97%)" }}
              >
                <span className="clickable">Stocking</span>
                <span style={{ color: "hsl(128, 15%, 61%)" }}>Up</span>
              </h3>
            </Link>

            <button
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "hsl(204, 33%, 97%)"
              }}
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
            style={{ backgroundColor: "hsl(60, 1%, 14%)" }}
          >
            <div className="navbar-end">
              <div className="navbar-item">
                <Link to="/" onClick={() => setOpen(false)}>
                  <h5
                    className="subtitle is-5 clickable"
                    style={{ color: "hsl(204, 33%, 97%)" }}
                  >
                    Watchlist
                  </h5>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/profile" onClick={() => setOpen(false)}>
                  <h5
                    className="subtitle is-5 clickable"
                    style={{ color: "hsl(204, 33%, 97%)" }}
                  >
                    Profile
                  </h5>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/about" onClick={() => setOpen(false)}>
                  <h5
                    className="subtitle is-5 clickable"
                    style={{ color: "hsl(204, 33%, 97%)" }}
                  >
                    About
                  </h5>
                </Link>
              </div>
              <div className="navbar-item">
                <Link to="/contact" onClick={() => setOpen(false)}>
                  <h5
                    className="subtitle is-5 clickable"
                    style={{ color: "hsl(204, 33%, 97%)" }}
                  >
                    Contact
                  </h5>
                </Link>
              </div>
              <div className="navbar-item">
                <span onClick={() => setOpen(false)}>
                  <GoogleLogout
                    clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                    buttonText="Logout"
                    onLogoutSuccess={() => logout()}
                  />
                </span>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="navbar-brand" style={{ width: "100%" }}>
            <Link to="/" className="navbar-item" onClick={() => setOpen(false)}>
              <h3
                className="title is-3"
                style={{ color: "hsl(204, 33%, 97%)" }}
              >
                <span className="clickable">Stocking</span>
                <span style={{ color: "hsl(128, 15%, 61%)" }}>Up</span>
              </h3>
            </Link>

            <div className="navbar-item" style={{ marginLeft: "auto" }}>
              <span onClick={() => setOpen(false)}>
                <GoogleLogin
                  clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              </span>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Nav;
