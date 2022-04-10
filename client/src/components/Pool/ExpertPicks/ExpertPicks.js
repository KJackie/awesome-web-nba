import React, { useState, useEffect } from "react";

function ExpertPicks({ item, labels }) {
  let recordCount = 0;

  const [test, setTest] = useState([]);

  useEffect(() => {
    let picksArr = [];
    picksArr.push(item.picks);

    let sortedPicks = [];
    // filter picks by sequence number
    const pickSequence = (picksArr) => {
      return picksArr.map((item) => {
        let picksSorted = Object.keys(item).sort(function (a, b) {
          return item[a].seq - item[b].seq;
        });
        picksSorted.map((item) => {
          return sortedPicks.push(picksArr[0][item]);
        });
        setTest(sortedPicks);
      });
    };
    pickSequence(picksArr);
  }, [item.picks]);

  return (
    <div className="user-pick-box">
      <div className="user">
        <p className="user-email">{item.username}</p>
      </div>

      <div className="user-pick">
        {test.map((picks, index) => {
          console.log(picks);
          if (
            (labels[index]?.home_team_id === picks &&
              labels[index]?.live_home_team_score >
                labels[index]?.live_road_team_score) ||
            (labels[index]?.road_team_id === picks &&
              labels[index]?.live_road_team_score >
                labels[index]?.live_home_team_score)
          ) {
            recordCount++;
          }
          return (
            <div
              className={
                // if HOME team = your pick and HOME team is winning... apply 'winning'
                labels[index]?.home_team_id === picks &&
                labels[index]?.live_home_team_score >
                  labels[index]?.live_road_team_score
                  ? "winner"
                  : // if AWAY team = your pick and AWAY team is winning... apply 'winning'
                  labels[index]?.road_team_id === picks &&
                    labels[index]?.live_road_team_score >
                      labels[index]?.live_home_team_score
                  ? "winner"
                  : // if AWAY team = your pick and AWAY team is losing... apply 'losing'
                  labels[index]?.road_team_id === picks &&
                    labels[index]?.live_road_team_score <
                      labels[index]?.live_home_team_score
                  ? "loser"
                  : // if HOME team = your pick and HOME team is losing... apply 'losing'
                  labels[index]?.home_team_id === picks &&
                    labels[index]?.live_home_team_score <
                      labels[index]?.live_road_team_score
                  ? "loser"
                  : "picked-logo"
              }
            >
              {picks === undefined ? (
                <img src={`../icons/no-pick.svg`} className="logo" alt="" />
              ) : (
                <img
                  src={`../icons/${picks.team_id}.svg`}
                  className="logo"
                  alt=""
                />
              )}
            </div>
          );
        })}
      </div>
      <div className="user">
        <p className="record">{recordCount}</p>
      </div>
    </div>
  );
}

export default ExpertPicks;
