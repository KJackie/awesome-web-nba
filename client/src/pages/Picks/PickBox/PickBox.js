import React from "react";
import MissedPicks from './MissedPicks'

function PickBox({ item, index }) {
  return (
    <div className="games-box" key={index}>
      {!item.kicked_off ? (
        <div className="game">
          {/* HOME SIDE */}
          <label className="box">
            <input
              type="radio"
              name={item.home_team_id}
              id="radio"
              value={item.home_team_id}
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
              <p className="home-away"> Home </p>
            </div>
          </label>

          {/* GAME INFO */}
          <div className="game-info">
            <p className="game-time">{item.kickoff_time}</p>
          </div>

          {/* AWAY SIDE */}
          <label className="box">
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
              value={item.road_team_id}
              className="radio"
            />
            <div className="team-id">
              <p> {item.road_team_id}</p>
              <p className="home-away"> Away </p>
            </div>
            <div className="abbr">
              <p> {item.road_team_id}</p>
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
