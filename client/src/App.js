import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import './App.scss';
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./components/header/header";
import Welcome from "./components/welcome/welcome";
import Home from "./components/home/home";
import Search from "./components/search/search";
//import Feed from "./components/feed/feed";
import LoginController from "./components/login/LoginController";
import Profile from './components/profile/profile';
import PrivateRoute from './components/routes/PrivateRoute';
//import UserProfile from './components/profiles/UserProfile';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="">
          <Header />
        </header>
        <Route path="/login">
            <LoginController />
        </Route>
        <Switch>
          <Route path="/" exact component={ Welcome } />
          <Route path="/welcome" exact component={ Welcome } />
          <PrivateRoute path="/home" component={ Home } />
          <PrivateRoute path="/search" component={ Search } />
          <PrivateRoute path="/profile" component={ Profile } />
        </Switch>
      </div>
    </Router>
  );

}

export default App;
