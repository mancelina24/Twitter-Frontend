import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useSelector } from "react-redux";
import "./App.css";

const App = () => {
  const { isAuthenticated } = useSelector((state) => state.user);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/login">
            {isAuthenticated ? <Redirect to="/" /> : <Login />}
          </Route>
          <Route exact path="/register">
            {isAuthenticated ? <Redirect to="/" /> : <Register />}
          </Route>
          <Route exact path="/">
            {isAuthenticated ? <Home /> : <Redirect to="/login" />}
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
