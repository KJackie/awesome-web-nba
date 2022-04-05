import React from "react";

function ExpertPicks({ item, sortedGames }) {
  let recordCount = 0;

  let picksArr = [];

  picksArr.push(item.picks);

  let expertPick = [];

  picksArr.map((item, i) => {
    return expertPick.push(
      item[1178]?.team_id,
      item[1179]?.team_id,
      item[1180]?.team_id,
      item[1181]?.team_id,
      item[1182]?.team_id,
      item[1183]?.team_id,
      item[1184]?.team_id,
      item[1185]?.team_id,
      item[1186]?.team_id,
      item[1187]?.team_id,
      item[1188]?.team_id,
      item[1189]?.team_id
    );
  });

  return (
    <div className="user-pick-box">
      <div className="user">
        <p className="user-email">{item.username}</p>
        
      </div>

      <div className="user-pick">
        {expertPick.map((picks, index) => {
          if (
            (sortedGames[index]?.homeEventResult.competitor.shortName ===
              picks &&
              sortedGames[index]?.homeEventResult.score >
                sortedGames[index]?.awayEventResult.score) ||
            (sortedGames[index]?.awayEventResult.competitor.shortName ===
              picks &&
              sortedGames[index]?.awayEventResult.score >
                sortedGames[index]?.homeEventResult.score)
          ) {
            recordCount++;
          }
          return (
            <div
              className={
                // if HOME team = your pick and HOME team is winning... apply 'winning'
                sortedGames[index]?.homeEventResult.competitor.shortNameFR ===
                  picks &&
                sortedGames[index]?.homeEventResult.score >
                  sortedGames[index]?.awayEventResult.score
                  ? "winner"
                  : // if AWAY team = your pick and AWAY team is winning... apply 'winning'
                  sortedGames[index]?.awayEventResult.competitor.shortNameFR ===
                      picks &&
                    sortedGames[index]?.awayEventResult.score >
                      sortedGames[index]?.homeEventResult.score
                  ? "winner"
                  : // if AWAY team = your pick and AWAY team is losing... apply 'losing'
                  sortedGames[index]?.awayEventResult.competitor.shortNameFR ===
                      picks &&
                    sortedGames[index]?.awayEventResult.score <
                      sortedGames[index]?.homeEventResult.score
                  ? "loser"
                  : // if HOME team = your pick and HOME team is losing... apply 'losing'
                  sortedGames[index]?.homeEventResult.competitor.shortNameFR ===
                      picks &&
                    sortedGames[index]?.homeEventResult.score <
                      sortedGames[index]?.awayEventResult.score
                  ? "loser"
                  : "picked-logo"
              }
            >
              {picks === undefined ? (
                <img src={`../icons/no-pick.svg`} className="logo" alt="" />
              ) : (
                <img src={`../icons/${picks}.svg`} className="logo" alt="" />
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
