import React from "react";
import MissedPicks from './MissedPicks'

function PickBox({ item, index }) {
  return (
    <div className="games-box" key={index}>
      {item.status !== "Final" && item.status !== "In-Progress" ? (
        <div className="game">
          {/* HOME SIDE */}
          <label className="box">
            <input
              type="radio"
              name={item.id}
              id="radio"
              value={item.homeEventResult.competitor.shortName}
            />
            <div className="logo">
              <img
                src={`../icons/${item.homeEventResult.competitor.shortName}.svg`}
                className="team-logo"
                alt=""
              />
            </div>

            <div className="team-id">
              <p> {item.homeEventResult.competitor.shortName}</p>
              <p className="home-away"> Home </p>
            </div>
          </label>

          {/* GAME INFO */}
          <div className="game-info">
            <p className="game-time">{item.gameStatus}</p>
          </div>

          {/* AWAY SIDE */}
          <label className="box">
            <div className="logo">
              <img
                src={`../icons/${item.awayEventResult.competitor.shortName}.svg`}
                className="team-logo"
                alt=""
              />
            </div>

            <input
              type="radio"
              name={item.id}
              id="radio"
              value={item.awayEventResult.competitor.shortName}
              className="radio"
            />
            <div className="team-id">
              <p> {item.awayEventResult.competitor.shortName}</p>
              <p className="home-away"> Away </p>
            </div>
            <div className="abbr">
              <p> {item.awayEventResult.competitor.shortName}</p>
              <p> Home </p>
            </div>
          </label>
        </div>
      ) : (
        <MissedPicks item={item} />
      )}
    </div>
  );
}

export default PickBox;
