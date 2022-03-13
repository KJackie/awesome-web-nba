import React from "react";
import "./Expand.scss";

function Expand({ data }) {



  var away = data.competitions[0].competitors[0];
  var home = data.competitions[0].competitors[1];
  var homeLeader = data.competitions[0].competitors[1].leaders[0].leaders[0];
  var awayLeader = data.competitions[0].competitors[0].leaders[0].leaders[0];

  return (
    <div className="expand-container">
      {/* <div className="expand-labels">
        <p className="sl-label"> Scoring leaders </p>
      </div> */}

      <div className="expand-content">
        {/* BOX SCORE */}
        <div className="box-score">
          <div className="labels">
            <p className="team-name"> Team </p>
            <div className="quarter-labels">
              <p>1</p>
              <p>2</p>
              <p>3</p>
              <p>4</p>
            </div>
          </div>
          {data.status.type.state !== "pre" && (
            <>
              <div className="boxscore-inner">
                <div className="team-labels">
                  <p>{home.team.abbreviation}</p>
                  <p>{away.team.abbreviation}</p>
                </div>

                <div className="quarters">
                  <div className="home-quarters">
                    <p>{home.linescores[0]?.value}</p>
                    <p>{home.linescores[1]?.value}</p>
                    <p>{home.linescores[2]?.value}</p>
                    <p>{home?.linescores[3]?.value}</p>
                  </div>

                  <div className="away-quarters">
                    <p>{away.linescores[0]?.value}</p>
                    <p>{away.linescores[1]?.value}</p>
                    <p>{away.linescores[2]?.value}</p>
                    <p>{away?.linescores[3]?.value}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="leaders">
          <div className="home-leader">
            <img src={homeLeader.athlete.headshot} alt="" />
            <p>{homeLeader.athlete.fullName}</p>
            {data.status.type.state !== "pre" ? (
            <p>Points: {homeLeader.displayValue}</p>
            ):(
              <p>PPG: {homeLeader.displayValue}</p>
            )}
          </div>
          <div className="away-leader">
            <img src={awayLeader.athlete.headshot} alt="" />

            <p>{awayLeader.athlete.fullName}</p>
            {data.status.type.state !== "pre" ? (
            <p>Points: {awayLeader.displayValue}</p>
            ):(
              <p>PPG: {awayLeader.displayValue}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Expand;
