import React from "react";

function MissedPicks({ item }) {
  return (
    <div className="game">
      {/* HOME SIDE */}
      <label className="box no-pick">
        <input
          type="radio"
          name={item?.id}
          id="radio"
          value={"no-pick"}
          checked
        />
        <div className="logo">
          <img
            src={`../icons/${item.homeEventResult.competitor.shortName}.svg`}
            className="team-logo"
            alt=""
          />
        </div>

        <div className="team-id">
          <p> {item.homeEventResult.competitor.location}</p>
          <p> Home </p>
        </div>
        <div className="abbr">
          <p> {item.homeEventResult.competitor.shortName}</p>
        </div>
      </label>

      {/* GAME INFO */}
      <div className="game-info">
        <p className="game-time">{item.gameStatus}</p>
      </div>

      {/* AWAY SIDE */}
      <label className="box no-pick">
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
          value={"no-pick"}
          className="radio"
        />
        <div className="team-id">
          <p> {item.awayEventResult.competitor.location}</p>
          <p> Away </p>
        </div>
        <div className="abbr">
          <p> {item.awayEventResult.competitor.shortName}</p>
        </div>
      </label>
    </div>
  );
}

export default MissedPicks;
