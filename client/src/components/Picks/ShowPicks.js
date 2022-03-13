import React, { useEffect, useState } from "react";
import "./ShowPicks.scss";
import axios from "axios";
import domain from "../../util/domain";
import moment from "moment";
function ShowPicks({ picks, getPicks, editPicks, data, gameDate }) {
  const [loading, setLoading] = useState(false);
  // let gameDate = moment(data[1]?.date).format("MMMM DD");

  // DELETE PICKS

  async function deletePicks() {
    if (window.confirm("Do you want to delete your picks?"))
      await axios.delete(`${domain}/picks/${picks._id}`);

    getPicks();
  }

  

  return (
    <div className="show-picks">
      <div className="info-text">
        <h1> Your picks</h1>
        {/* <p> View your picks for {gameDate}</p> */}
      </div>
      <div className="labels">
        <p className="l-entry"> Entry </p>
        <p className="l-picks"> Picks </p>
        <p className="l-delete"> Delete </p>
      </div>
      <div className="user"></div>
      <div className="picks-container">
        <div className="entry-status">
          <p> Compete </p>
        </div>
        <div className="picks">
          {!picks ? (
            <p> Loading </p>
          ) : (
            picks.picks.map((item, index) => {
              return (
                <div className="pick" key={index}>
                  <img src={`../icons/${item}.svg`} className="logo" alt="" />
                </div>
              );
            })
          )}
        </div>
        <div className="delete-picks">
          <button className="delete-btn" onClick={deletePicks}>
            Delete
          </button>
        </div>
      </div>
      {/* <div className="text">
        <h1> Stay Updated </h1>
        <div className="news-container">
          
        </div>
      </div> */}
      {/* <footer>
        <p>
          COPYRIGHT © 2022 JDELI, LLC <br /> FOR ENTERTAINMENT PURPOSES ONLY
        </p>
      </footer> */}
    </div>
  );
}

export default ShowPicks;
