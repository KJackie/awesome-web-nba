import React from 'react'

function UserPicks({item, sortedGames}) {

 let recordCount = 0;

  return (
   <div className="user-pick-box">
   <div className="user">
     <p className="user-email">{item.username}</p>
   </div>

   <div className="user-pick">
     {item.picks.map((picks, index) => {
       if (
         (sortedGames[index]?.homeEventResult.competitor
           .shortName === picks &&
           sortedGames[index]?.homeEventResult.score >
             sortedGames[index]?.awayEventResult.score) ||
         (sortedGames[index]?.awayEventResult.competitor
           .shortName === picks &&
           sortedGames[index]?.awayEventResult.score >
             sortedGames[index]?.homeEventResult.score)
       ) {
         recordCount++;
       }
       return (
         <div
           className={
             // if HOME team = your pick and HOME team is winning... apply 'winning'
             sortedGames[index]?.homeEventResult.competitor
               .shortName === picks &&
             sortedGames[index]?.homeEventResult.score >
               sortedGames[index]?.awayEventResult.score
               ? "winner"
               : // if AWAY team = your pick and AWAY team is winning... apply 'winning'
               sortedGames[index]?.awayEventResult.competitor
                   .shortName === picks &&
                 sortedGames[index]?.awayEventResult.score >
                   sortedGames[index]?.homeEventResult.score
               ? "winner"
               : // if AWAY team = your pick and AWAY team is losing... apply 'losing'
               sortedGames[index]?.awayEventResult.competitor
                   .shortName === picks &&
                 sortedGames[index]?.awayEventResult.score <
                   sortedGames[index]?.homeEventResult.score
               ? "loser"
               : // if HOME team = your pick and HOME team is losing... apply 'losing'
               sortedGames[index]?.homeEventResult.competitor
                   .shortName === picks &&
                 sortedGames[index]?.homeEventResult.score <
                   sortedGames[index]?.awayEventResult.score
               ? "loser"
               : "picked-logo"
           }
         >
           <img
             src={`../icons/${picks}.svg`}
             className="logo"
             alt=""
           />
         </div>
       );
     })}
   </div>
   <div className="user">
     <p className="record">{recordCount}</p>
   </div>
 </div>
  )
}

export default UserPicks