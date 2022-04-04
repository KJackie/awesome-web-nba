import React from "react";

function ExpertPicks({ item, sortedGames }) {
  let recordCount = 0;

  console.log(item);
  let picksArr = [];

  picksArr.push(item.picks);

  let expertPick = [];

  picksArr.map((item, i) => {
    return expertPick.push(
      item[1166]?.team_id,
      item[1167]?.team_id,
      item[1168]?.team_id,
      item[1169]?.team_id,
      item[1170]?.team_id,
      item[1171]?.team_id,
      item[1172]?.team_id,
      item[1173]?.team_id,
      item[1174]?.team_id,
      item[1175]?.team_id,
      item[1176]?.team_id,
      item[1177]?.team_id
    );
  });

  return (
    <div className="user-pick-box">
      <div className="user">
        <p className="user-email">{item.username} {item.affiliation && <img className="verified" src="../images/verified.png" alt="" />}</p>
        
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
              {picks === "NO" ? (
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
