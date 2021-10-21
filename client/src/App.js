import "./App.css";
import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./components/views/LandingPage/LandingPage";
import LoginPage from "./components/views/LoginPage/LoginPage";
import RegisterPage from "./components/views/RegisterPage/RegisterPage";
import LoginNextPage from "./components/views/LoginNextPage/LoginNextPage";
import NavBar from "./components/views/NavBar/NavBar";
import Auth from "./hoc/auth";
import UploadProductPage from "./components/views/UploadProductPage/UploadProductPage";
import FinderPage from "./components/views/FinderPage/FinderPage";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route
            exact
            path="/loginNext"
            component={Auth(LoginNextPage, null)}
          />
          <Route exact path="/login" component={Auth(LoginPage, false)} />
          <Route exact path="/register" component={Auth(RegisterPage, false)} />
          <Route
            exact
            path="*"
            component={() => (
              <>
                <NavBar />
                <Route exact path="/" component={Auth(LandingPage, null)} />
                <Route
                  exact
                  path="/product/upload"
                  component={Auth(UploadProductPage, true)}
                />
                <Route
                  exact
                  path="/finder"
                  component={Auth(FinderPage, null)}
                />
              </>
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
