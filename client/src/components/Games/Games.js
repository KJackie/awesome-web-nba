import React, { useState} from "react";
import "./Games.scss";
import Card from "./Card/Card";
import Controls from "./Controls/Controls";
import moment from "moment";

function Games({gameAPI, setDate, date}) {
  const [filterGames, setFilterGames] = useState(false);
  

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
        <Controls
          gameDate={gameDate}
          increase={increase}
          decrease={decrease}
        />
      </div>
      <div className="game-side">
        <div className="filter-labels"></div>
        <Card games={gameAPI} filterGames={filterGames} />
      </div>
    </div>
  );
}

export default Games;
