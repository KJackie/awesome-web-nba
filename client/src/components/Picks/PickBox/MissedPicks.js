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
          defaultValue={"no-pick"}
          checked
        />
        <div className="logo">
          <img
            src={`../icons/${item.home_team_id}.svg`}
            className="team-logo"
            alt=""
          />
        </div>

        <div className="team-id">
          <p> {item.home_team_id}</p>
          <p> Home </p>
        </div>
        <div className="abbr">
          <p> {item.home_team_id}</p>
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
            src={`../icons/${item.road_team_id}.svg`}
            className="team-logo"
            alt=""
          />
        </div>

        <input
          type="radio"
          name={item.id}
          id="radio"
          defaultValue={"no-pick"}
          className="radio"
        />
        <div className="team-id">
          <p> {item.road_team_id}</p>
          <p> Away </p>
        </div>
        <div className="abbr">
          <p> {item.road_team_id}</p>
        </div>
      </label>
    </div>
  );
}

export default MissedPicks;
