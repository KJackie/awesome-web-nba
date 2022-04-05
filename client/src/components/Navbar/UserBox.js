import React from "react";
import "./UserBox.scss";
import { Link } from "react-router-dom";

function UserBox({ username, favTeam, user, logOut }) {
  return (
    <div className="user-box-contents">
      <div className="user-box-top">
        <p>{username}</p>
        <img src={`../icons/${favTeam}.svg`} className="team-logo" alt="" />
      </div>
      {user ? (
        <div className="user-controls">
          <Link to="/picks" className="link btn">
            Your Picks
          </Link>
          <Link to="/pool" className="link btn">
            Vew Pool
          </Link>
          <Link to="/games" className="link btn">
            Games
          </Link>

          <button className="logout-btn btn" onClick={logOut}>
            Log out
          </button>
        </div>
      ) : (
        <div className="user-controls">
          <p> You are not signed in. </p>
        </div>
      )}
    </div>
  );
}

export default UserBox;
