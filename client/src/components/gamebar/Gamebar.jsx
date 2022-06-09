import React from 'react'
import moment from 'moment';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import './Gamebar.scss';

const Gamebar = ({ sortedGames }) => {

 let gameMonth = moment(sortedGames[1]?.date).format('MMM');
 let gameDay = moment(sortedGames[1]?.date).format('D');
 return (
  <div className='top-gamebar'>
   <div className="date">
    <p> {gameMonth} </p>
    <p> {gameDay} </p>
   </div>
   <div className='gamebar'>
    {sortedGames.map((item, index) => {
     let home = item.competitions[0].competitors[0].team;
     let away = item.competitions[0].competitors[1].team;
     return <div className="game-box">
      <p className='status'>{item.status.type.detail}</p>
      <div className="home">
       <div className="logo-container">
        <img src={`../mlb-icons/${home.abbreviation}.svg`} alt="" className='logo' />
       </div>
       <p className='name'>{home.abbreviation}</p>
       <p className='record'>{item.competitions[0].competitors[0].records[0].summary}</p>
       <p className='score'>{item.competitions[0].competitors[0].score}</p>

      </div>
      <div className="away">
       <div className="logo-container">
        <img src={`../mlb-icons/${away.abbreviation}.svg`} alt="" className='logo' />
       </div>

       <p className='name'>{away.abbreviation}</p>
       <p className='record'>{item.competitions[0].competitors[0].records[0].summary}</p>
       <p className='score'>{item.competitions[0].competitors[1].score}</p>

      </div>
     </div>;
    })}
   </div>
   <div className="scroll-controls">
    <div className="left">
     <AiOutlineLeft />
    </div>
    <div className="right">
     <AiOutlineRight />
    </div>
   </div>
  </div>
 )
}

export default Gamebar