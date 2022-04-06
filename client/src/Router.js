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
import BetCalc from './components/BetCalc/BetCalc'
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

  const [gameAPI, setGameAPI] = useState([]);

  let today = new Date();
  var res = today.toISOString().slice(0, 10).replace(/-/g, "");
  let theDate = Number(res);

  let [date, setDate] = useState(theDate);

  useEffect(() => {
    fetch(
      `https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?region=us&lang=en&contentorigin=espn&limit=100&calendartype=blacklist&includeModules=videos%2Ccards&dates=${date}&tz=America%2FNew_York&buyWindow=1m&showAirings=buy%2Clive&showZipLookup=true`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGameAPI(data);
      });
  }, [theDate, date]);

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <HomeNavbar />
          <Home gameAPI={gameAPI} />
        </Route>
        <Route exact path="/picks">
          <Navbar />
          <PicksPage data={data} sortedGames={sortedGames} />
        </Route>
        <Route exact path="/pool">
          <Navbar />
          <Pool />
        </Route>
        <Route exact path="/betcalculator">
          <Navbar />
          <BetCalc />
        </Route>
        <Route exact path="/games">
          <Navbar />
          <Games
            games={games}
            gameAPI={gameAPI}
            date={date}
            setDate={setDate}
          />
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
