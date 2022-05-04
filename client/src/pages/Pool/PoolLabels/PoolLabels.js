import React from "react";
function PoolLabels({ labels }) {
  return (
    <div className="label-container">
      <div className="labels">
        <div className="name-label">
          <p> Player </p>
        </div>

        <div className="matchups">
          {labels.map((item, index) => {
            return (
              <div className="label-box">
                <p
                  className={
                    item.live_home_team_score > item.live_road_team_score
                      ? "winner"
                      : "losing"
                  }
                >
                  {item.home_team_id}
                </p>
                {item.live_home_team_score ? (
                  <p className="score"> {item.live_home_team_score}</p>
                ) : (
                  <p className="score"> 0 </p>
                )}

                <p> vs</p>

                {item.live_road_team_score ? (
                  <p className="score"> {item.live_road_team_score}</p>
                ) : (
                  <p className="score"> 0 </p>
                )}

                <p
                  className={
                    item.live_home_team_score < item.live_road_team_score
                      ? "winner"
                      : "losing"
                  }
                >
                  {item.road_team_id}
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
