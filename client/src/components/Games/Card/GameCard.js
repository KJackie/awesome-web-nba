import React, { useState } from "react";
import Expand from "./Expand";
function GameCard({ data}) {
  const [expand, setExpand] = useState(false);

  return (
    <div className={expand ? "border" : "game-card"}>
      <div className={expand ? "collapse" : "hide"}>
        <p onClick={() => setExpand(false)}> Close </p>
      </div>
      <div className="preview">
        <div className="name">
          <p>{data.name}</p>
          <p className="time">{data.status.type.shortDetail}</p>
          <p className={!expand ? "expand-btn" : "hide"} onClick={() => setExpand(!expand)}>
            Expand for more details
          </p>
        </div>
        {data.competitions.map((data, index) => {
          return (
            <div className="prev-home-away">
              <div className="away">
                <img
                  src={`../icons/${data.competitors[1].team.abbreviation}.svg`}
                  className="team-logo"
                  alt=""
                />
                <p>{data.competitors[1].team.abbreviation}</p>
                <p className="score">{data.competitors[1].score}</p>
              </div>
              <div className="home">
                <img
                  src={`../icons/${data.competitors[0].team.abbreviation}.svg`}
                  className="team-logo"
                  alt=""
                />
                <p>{data.competitors[0].team.abbreviation}</p>
                <p className="score">{data.competitors[0].score}</p>
                <p>{data.competitors[0].records.summary}</p>
              </div>
              
            </div>
           
          );
        })}
         <p className="expand-btn-mobile" onClick={() => setExpand(!expand)}>
            Expand for more details
          </p>
      </div>

      {expand ? (
        <div className="expand-details">
          <Expand data={data} />
        </div>
      ) : (
        <p> </p>
      )}
    </div>
  );
}

export default GameCard;
