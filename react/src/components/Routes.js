import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import Profile from "./Profile";
import About from "./About";
import Contact from "./Contact";
import NotFound from "./NotFound";

import { withRouter } from "react-router-dom";

const Routes = withRouter(props => {
  console.log("USER IN ROUTES: " + JSON.stringify(props.user));
  return (
    <Switch>
      <Route exact path="/" component={() => <Main user={props.user} />} />
      <Route
        exact
        path="/profile"
        component={() => <Profile user={props.user} />}
      />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
});

export default Routes;
