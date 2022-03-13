import React, { useState, useEffect } from "react";
import "./Games.scss";
import News from "../News/News";
import Card from "./Card/Card";
import Controls from "./Controls/Controls";
import moment from 'moment'

function Games() {
  const [filterGames, setFilterGames] = useState(false);
  const [filterNews, setFilterNews] = useState(false);
  const [gameAPI, setGameAPI] = useState([]);
  let today = new Date();
  var res = today.toISOString().slice(0, 10).replace(/-/g, "");
  let theDate = Number(res)


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



  let gameDate = moment(date, ["MM-DD-YYYY", "YYYY-MM-DD"]).format("MMMM DD");

  const increase = () => {
    setDate((prevCount) => {
      const newCount = Number(prevCount) + 1;
      localStorage.setItem("count", newCount);
      return newCount;
    });
  };

  const decrease = () => {
    setDate((prevCount) => {
      const newCount = Number(prevCount) - 1;
      localStorage.setItem("count", newCount);
      return newCount;
    });
  };

  return (
    <div className="game-page">
      <div className="game-controls">
        <Controls gameAPI={gameAPI} gameDate={gameDate} increase={increase} decrease={decrease} />
      </div>
      <div className="game-side">
        <div className="filter-labels"></div>
        <Card games={gameAPI} filterGames={filterGames} />
      </div>

      {/* <div className="news-side">
        <div className="filter-news">
          <p onClick={() => setFilterNews(!filterNews)}> Filter News </p>
        </div>
        <News />
      </div> */}
    </div>
  );
}

export default Games;
