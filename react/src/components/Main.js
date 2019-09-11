import React from "react";
import GoogleLogin from "react-google-login";
import { register } from "../actions/user";
const Main = () => {
  const responseGoogle = response => {
    console.log(response);

    register("test", response.profileObj.email.toString());
  };

  return (
    <>
      <GoogleLogin
        clientId="158562636348-ah58g7s1o64c16h1alsguklp5595r4uo.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy={"single_host_origin"}
      />
    </>
  );
};

export default Main;
