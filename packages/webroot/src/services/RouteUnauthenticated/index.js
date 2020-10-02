import React from "react";
import { Redirect, Route } from "react-router-dom";

import { hasCookie } from "../Auth";

const RouteUnauthenticated = ({ component: Component, path }) => {
  if (hasCookie()) {
    return <Redirect to="/" />;
  }

  return <Route component={Component} path={path} />;
};

export default RouteUnauthenticated;
