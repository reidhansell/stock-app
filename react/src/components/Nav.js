import React from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { Link } from "react-router-dom";

document.addEventListener("DOMContentLoaded", () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll(".navbar-burger"),
    0
  );

  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach(el => {
      el.addEventListener("click", () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");
      });
    });
  }
});

const Nav = props => {
  const { responseGoogle, isAuthenticated, logout } = props;
  return (
    <>
      <nav className="navbar" role="navigation" aria-label="main navigation" style={{backgroundColor:"darkgray"}}>
        <div className="navbar-brand">
          <Link to="/" className="navbar-item">
            <h3>Stonks</h3>
          </Link>

          <button
            style={{ background: "none", border: "none", outline: "none" }}
            className="navbar-burger burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div id="navbarBasicExample" className="navbar-menu" style={{backgroundColor:"darkgray"}}>
          <div className="navbar-end">
            {isAuthenticated ? (
              <>
                <div className="navbar-item">
                  <Link to="/">Watchlist</Link>
                </div>
                <div className="navbar-item">
                  <Link to="/profile">Profile</Link>
                </div>
              </>
            ) : null}
            <div className="navbar-item">
              <Link to="/about">About</Link>
            </div>
            <div className="navbar-item">
              <Link to="/contact">Contact</Link>
            </div>
            <div className="navbar-item">
              {isAuthenticated ? (
                <GoogleLogout
                  clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                  buttonText="Logout"
                  onLogoutSuccess={() => logout()}
                ></GoogleLogout>
              ) : (
                <GoogleLogin
                  clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogle}
                  cookiePolicy={"single_host_origin"}
                />
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Nav;
