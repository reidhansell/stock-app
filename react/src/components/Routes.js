import React from "react";
import { Route, Switch } from "react-router-dom";
import Main from "./Main";
import Profile from "./Profile";
import About from "./About";
import Contact from "./Contact";
import NotFound from "./NotFound";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Main} />
      <Route exact path="/profile" component={Profile} />
      <Route exact path="/about" component={About} />
      <Route exact path="/contact" component={Contact} />
      <Route component={NotFound} />
    </Switch>
  );
};

export default Routes;
