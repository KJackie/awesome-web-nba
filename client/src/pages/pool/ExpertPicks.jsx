import React, { useState, useEffect } from "react";
import './ExpertPicks.scss';
function ExpertPicks({ item }) {
 let recordCount = 0;

 const [expertPick, setExpertPick] = useState([]);


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
    setExpertPick(sortedPicks);
   });
  };
  pickSequence(picksArr);
 }, [item.picks]);

 return (
  <div className="player-pick-box">
   <div className="pick">
    <p className="user-email">{item.username}</p>
   </div>
   <div className="show-picks">
    {expertPick.map((picks, index) => {
     return (
      <div className="pick-box" key={index}
      >
       <img
        src={`../mlb-icons/${picks.team_id}.svg`
        }
        className={picks.result === 'win' ? "winner-logo" : picks.result === 'loss' ? 'loser-logo' : 'logo'}
        alt={picks.team_id}
       />
      </div>

     )
    })}
   </div>


  </div>
 );
}

export default ExpertPicks;
