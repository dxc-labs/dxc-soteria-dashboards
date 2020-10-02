import React from "react";
import { Redirect, Route } from "react-router-dom";

import { hasCookie } from "../Auth";

const RouteAuthenticated = ({ component: Component, path }) => {
  if (!hasCookie()) {
    return <Redirect to="/dashboards/signin" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteAuthenticated;