import React from 'react'
import './PickBox.scss';
const PickBox = ({ data, increment }) => {
 // team info
 let homeTeamName = data.competitions[0].competitors[0].team.displayName
 let awayTeamName = data.competitions[0].competitors[1].team.displayName

 let homeTeamAbbr = data.competitions[0].competitors[0].team.abbreviation
 let awayTeamAbbr = data.competitions[0].competitors[1].team.abbreviation

 const { shortDetail } = data.status.type


 return (
  <div className='game-box'>
   {data.status.type.description === 'Scheduled' && (
    <div className="game">
     {/* home team */}
     <label className='box'>
      <input
       type='radio'
       name={data.id}
       id='radio'
       value={homeTeamAbbr}
       onClick={increment}
      />
      <div className='logo'>
       <img
        src={`../mlb-icons/${homeTeamAbbr}.svg`}
        className='team-logo'
        alt=''
       />
      </div>

      <div className='team-id'>
       <p> {homeTeamName}</p>
       <p className='home-away'> Home </p>
      </div>
     </label>

     {/* gametime */}
     <div className="game-time">
      <p> {shortDetail} </p>
     </div>

     {/* away team */}
     <label className='box'>
      <input
       type='radio'
       name={data.id}
       id='radio'
       value={awayTeamAbbr}
       onClick={increment}
      />
      <div className='logo'>
       <img
        src={`../mlb-icons/${awayTeamAbbr}.svg`}
        className='team-logo'
        alt=''
       />
      </div>

      <div className='team-id'>
       <p> {awayTeamName}</p>
       <p className='home-away'> Away </p>
      </div>
     </label>
    </div>
   )}
   {data.status.type.description !== 'Scheduled' && (
    <div className="game">
     {/* home team */}
     <label className='box no-pick'>
      <input
       type='radio'
       name={data.id}
       id='radio'
       value={homeTeamAbbr}
      />
      <div className='logo'>
       <img
        src={`../mlb-icons/${homeTeamAbbr}.svg`}
        className='team-logo'
        alt=''
       />
      </div>

      <div className='team-id'>
       <p> {homeTeamName}</p>
       <p className='home-away'> Home </p>
      </div>
     </label>

     {/* gametime */}
     <div className="game-time">
      <p> {shortDetail} </p>
     </div>

     {/* away team */}
     <label className='box no-pick'>
      <input
       type='radio'
       name={data.id}
       id='radio'
       defaultValue={"no-pick"}
       checked
      />
      <div className='logo'>
       <img
        src={`../mlb-icons/${awayTeamAbbr}.svg`}
        className='team-logo'
        alt=''
       />
      </div>

      <div className='team-id'>
       <p> {awayTeamName}</p>
       <p className='home-away'> Away </p>
      </div>
     </label>
    </div>
   )}


  </div>
 )
}

export default PickBox