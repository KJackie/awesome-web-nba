import React, { useState, useEffect, useContext } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Home from "./components/Home/Home";
import HomeNavbar from "./components/Navbar/HomeNavbar";
import MakePicks from "./components/Picks/MakePicks";
import Navbar from "./components/Navbar/Navbar";
import domain from "./util/domain";
import Pool from "./components/Pool/Pool";
import PicksPage from "./components/Picks/PicksPage";
import ShowPicks from "./components/Picks/ShowPicks";
import UserContext from "./context/UserContext";
import axios from "axios";
import Games from "./components/Games/Games";
function Router() {
  const [data, setData] = useState([]);
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(`${domain}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[1].eventList);
      });
  }, []);

  var sortedGames = data.sort(function (a, b) {
    return a.eventId - b.eventId;
  });


  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomeNavbar />
          <Home />
        </Route>
        <Route exact path="/picks">
          <Navbar />

          <PicksPage data={data} sortedGames={sortedGames} />
        </Route>
        <Route exact path="/pool">
          <Navbar />
          <Pool />
        </Route>
        <Route exact path="/games">
          <Navbar />
          <Games games={games} />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/register">
          <Register />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default Router;
