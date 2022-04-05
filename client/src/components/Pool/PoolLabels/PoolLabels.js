import React from "react";

function PoolLabels({ sortedGames }) {



  return (
    <div className="label-container">
      <div className="labels">
        <div className="name-label">
          <p> Player </p>
        </div>

        <div className="matchups">
          {sortedGames.map((item, index) => {
            return (
              <div className="label-box">
                <p
                  className={
                    item.homeEventResult.score > item.awayEventResult.score
                      ? "winner"
                      : "losing"
                  }
                >
                  {item.homeEventResult.competitor.shortNameFR}
                </p>
                {item.homeEventResult.score ? (
                  <p className="score"> {item.homeEventResult.score}</p>
                ) : (
                  <p className="score"> 0 </p>
                )}

                <p> vs</p>

                {item.awayEventResult.score ? (
                  <p className="score"> {item.awayEventResult.score}</p>
                ) : (
                  <p className="score"> 0 </p>
                )}

                <p
                  className={
                    item.homeEventResult.score < item.awayEventResult.score
                      ? "winner"
                      : "losing"
                  }
                >
                  {item.awayEventResult.competitor.shortNameFR}
                </p>
              </div>
            );
          })}
        </div>

        <div className="record-label">
          <p> Score </p>
        </div>
      </div>
    </div>
  );
}

export default PoolLabels;
