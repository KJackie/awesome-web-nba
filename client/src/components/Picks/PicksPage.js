import React, { useContext, useEffect, useState } from "react";
import MakePicks from "./MakePicks";
import UserContext from "../../context/UserContext";
import axios from "axios";
import domain from "../../util/domain";
import ShowPicks from "./ShowPicks";
import moment from "moment";
import './PicksPage.scss'
function PicksPage({ data, sortedGames }) {
  const { user } = useContext(UserContext);

  // GET PICKS
  const [picks, setPicks] = useState([]);
  // GET EMAIL
  const [email, setEmail] = useState("");
  // GET USERNAME
  const [username, setUsername] = useState("");

  // GET USER FROM DATABASE
  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setEmail(userRes.data.email);
    setUsername(userRes.data.username);
  }
  getUser();

  useEffect(() => {
    if (!user) setPicks([]);
    else getPicks();
  }, [user]);

  // GET USER PICKS FROM DATABASE
  async function getPicks() {
    const pickRes = await axios.get(`${domain}/picks/`);
    setPicks(pickRes.data);
  }

  // RENDER PICKS
  function renderPicks() {
    let sortedPicks = [...picks];
    sortedPicks = sortedPicks.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
    return sortedPicks.map((picks, i) => {
      return (
        <ShowPicks
          key={i}
          picks={picks}
          getPicks={getPicks}
          data={data}
          gameDate={gameDate}
        />
      );
    });
  }

  //PICK
  let [pick, setPick] = useState([]);

  // ERROR MESSAGE
  const [errorMessage, setErrorMessage] = useState(null);

  // ADD PICKS TO DATABASE
  async function addPicks() {
    const picksData = {
      picks: pick,
      user: user,
      email: email,
      username: username,
    };
    try {
      axios.post(`${domain}/picks/`, picksData);
    } catch (err) {
      if (err.response) {
        if (err.response.data.errorMessage) {
          setErrorMessage(err.response.data.errorMessage);
        }
      }
    }
  }

  // GET CURRENT DATE
  let gameDate = moment(data[1]?.date).format("MMMM DD");

  return (
    <div className="picks-page">
      <div className="content">
        {picks.length < 0 && (
          <p className="content-date">
            Make your picks for <br />
            <span>{gameDate}</span>
          </p>
        )}
         {!user && (
            <div className="no-user-msg">
              <p> You must be signed in to make picks</p>
            </div>
          )}
        {picks.length > 0
        ? renderPicks()
        : user && (
            <>
             <MakePicks data={data} addPicks={addPicks} pick={pick} setPick={setPick} sortedGames={sortedGames} />
            </>
        )}
      </div>
    </div>
  );
}

export default PicksPage;
