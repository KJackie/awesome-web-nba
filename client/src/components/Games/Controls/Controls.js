import React, { useEffect } from "react";
import "./Controls.scss";
import moment from "moment";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
function Controls({
  gameAPI,
  decrease,
  increase,
  setFilterGames,
  filterGames,
  gameDate,
}) {
  return (
    <div className="control-container">
      <div className="date-container">
        <AiOutlineMinus className="changer" onClick={decrease} />

        <p className="control-date"> {gameDate} </p>
        <AiOutlinePlus className="changer" onClick={increase} />
      </div>
      {/* <div className="filter-games">
        <p onClick={() => setFilterGames(!filterGames)} className="live-label">
          Show Live Matches
        </p>
      </div> */}
    </div>
  );
}

export default Controls;
