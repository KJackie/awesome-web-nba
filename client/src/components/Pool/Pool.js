import React, { useContext, useEffect, useState } from "react";
import "./Pool.scss";
import axios from "axios";
import domain from "../../util/domain";
import UserContext from "../../context/UserContext";
import UserPicks from "./UserPicks/UserPicks";
import PoolLabels from "./PoolLabels/PoolLabels";
function Pool() {
  let [poolData, setPoolData] = useState([]);
  const [data, setData] = useState([]);

  async function getAllPicks() {
    let data = await axios.get(`${domain}/pool/`);
    setPoolData(data.data);
  }

  // delete picks once every day
  useEffect(() => {
    setInterval(function () {
      let date = new Date();
      if (date.getHours() === 22 && date.getMinutes() === 41) {
        axios.delete(`${domain}/picks/`);
      }
    }, 1000);
  }, []);

  // GET USERNAME
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState("");
  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setUsername(userRes.data.username);
  }
  getUser();

  useEffect(() => {
    fetch(`${domain}/schedule`)
      .then((res) => res.json())
      .then((data) => {
        setData(data[1].eventList);
      });
  }, []);

  useEffect(() => {
    getAllPicks();
  }, []);

  var sortedGames = data.sort(function (a, b) {
    return a.eventId - b.eventId;
  });

  return (
    <div className="pool">
      <PoolLabels sortedGames={sortedGames} />
      {!user && (
        <div className="no-user-msg">
          <p>You must be signed in to view the pool</p>
        </div>
      )}
      <div className="all-picks">
        {poolData.map((item, index) => {
          return <UserPicks item={item} sortedGames={sortedGames} />;
        })}
      </div>
    </div>
  );
}

export default Pool;
