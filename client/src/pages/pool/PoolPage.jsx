import React, { useEffect, useState } from 'react'
import domain from '../../util/domain';
import ExpertPicks from './ExpertPicks';
import '../../styles/Pages.scss'
import GameLabels from './GameLabels';
import UserPicks from './UserPicks';
import axios from 'axios';

const PoolPage = ({ data, labels }) => {
  const [expertPicks, setExpertPicks] = useState([])
  const [poolData, setPoolData] = useState([])

  // set the day to use as a param in fetch
  let num = 63;

  // fetch expert picks from backend
  // check for date change (implement later)
  useEffect(() => {
    fetch(`${domain}/expert-picks/${num}`)
      .then((res) => res.json())
      .then((data) => {
        setExpertPicks(data.picks);
      });
  }, []);

  async function getAllPicks() {
    let data = await axios.get(`${domain}/pool/`);
    setPoolData(data.data);
  }

  useEffect(() => {
    getAllPicks();
  }, []);

  // delete picks once every day
  useEffect(() => {
    setInterval(function () {
      let date = new Date();
      if (date.getHours() === 22 && date.getMinutes() === 41) {
        axios.delete(`${domain}/picks/`);
      }
    }, 1000);
  }, []);


  return (
    <div className='page'>
      <GameLabels labels={labels} />
      {poolData.map((item, index) => {
        return <UserPicks item={item} labels={labels} />;
      })}
      {expertPicks.map((item, i) => {
        return <ExpertPicks item={item} key={i} />;
      })}
    </div>
  )
}

export default PoolPage