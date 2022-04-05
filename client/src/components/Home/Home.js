import React, { useContext, useState, useEffect } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import DemoLogin from "../Auth/DemoLogin";
import domain from "../../util/domain";
function Home({ gameAPI }) {
  const { user } = useContext(UserContext);

  console.log(gameAPI.videos);

  const [consensus, setConsensus] = useState([]);

  useEffect(() => {
    fetch(`${domain}/consensus`)
      .then((res) => res.json())
      .then((data) => {
        setConsensus(data);
      });
  }, []);

  console.log(consensus);

  return (
    <>
      <div className="home-page">
        {!user ? (
          <div className="left">
            <div className="title">
              <div className="home-text">
                <h1> Join the Pool </h1>
                {/* <p>
              {" "}
              Click{" "}
              <span>
                <Link to="/register" className="link btn">
                  here
                </Link>
              </span>{" "}
              to get started.{" "}
            </p> */}
                <p>
                  Stay updated on what's going on in the league and make daily
                  nba picks against real players in the pool!
                </p>
                <div className="btns">
                  <Link to="/register" className="register-btn">
                    Get started for free
                  </Link>
                  {!user && <DemoLogin />}
                </div>
              </div>
            </div>
          </div>
        ):(
          <div className="left">
          <div className="title">
            <div className="home-text">
              <h1> Todays Top Picks </h1>
              {/* <p>
            {" "}
            Click{" "}
            <span>
              <Link to="/register" className="link btn">
                here
              </Link>
            </span>{" "}
            to get started.{" "}
          </p> */}
              <p>
                The experts most confident picks.
              </p>
             
            </div>
          </div>
        </div>
        )}

        <div className="right">
          <div className="demo-bar first">
            {consensus.map((item, index) => {
              if (item.ht_pct_ats_experts > 80) {
                return (
                  <>
                    <div className="home">
                      <img
                        src={`../icons/${item?.home_team_id}.svg`}
                        className="team-logo"
                        alt=""
                      />
                      <p>{item?.home_team_id}</p>
                    </div>
                    <div className="vegas-odds">
                      <p>{item?.ht_pct_ats_experts}% </p>
                      <p> vs </p>
                      <p>{item?.rt_pct_ats_experts}% </p>
                    </div>
                    <div className="away">
                      <img
                        src={`../icons/${item?.road_team_id}.svg`}
                        className="team-logo"
                        alt=""
                      />
                      <p>{item?.road_team_id}</p>
                    </div>
                  </>
                );
              }
            })}
          </div>
          <div className="demo-bar second">
          {consensus.map((item, index) => {
              if (item.rt_pct_ats_experts > 80) {
                return (
                  <>
                    <div className="home">
                      <img
                        src={`../icons/${item?.road_team_id}.svg`}
                        className="team-logo"
                        alt=""
                      />
                      <p>{item?.road_team_id}</p>
                    </div>
                    <div className="vegas-odds">
                      <p>{item?.ht_pct_ats_experts}% </p>
                      <p> vs </p>
                      <p>{item?.rt_pct_ats_experts}% </p>
                    </div>
                    <div className="away">
                      <img
                        src={`../icons/${item?.home_team_id}.svg`}
                        className="team-logo"
                        alt=""
                      />
                      <p>{item?.home_team_id}</p>
                    </div>
                  </>
                );
              }
            })}
          </div>
        </div>
      </div>
      <div className="video-container-home">
        <h1> Highlights / News </h1>

        <div className="videos">
          {gameAPI?.videos?.map((item, index) => {
            return (
              <div className="video-box">
                <video
                  src={item.links.mobile.source.href}
                  controls="controls"
                  poster={item.thumbnail}
                ></video>
                <p className="headline">{item.headline}</p>
                <p className="description">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
      {/* <div className="consensus-container-home">
        <h1> Expert Consensus </h1>
        <div className="best-picks">
          {consensus.map((item, index) => {
            return (
              <div className="consensus-box">
                <div className="teams">
                  <div className="home-side">
                    <img
                      src={`../icons/${item?.home_team_id}.svg`}
                      className="team-logo"
                      alt=""
                    />
                    <p>{item.ht_pct_ats_combined}%</p>
                  </div>
                  <p>vs</p>

                  <div className="road-side">
                    <img
                      src={`../icons/${item?.road_team_id}.svg`}
                      className="team-logo"
                      alt=""
                    />{" "}
                    <p>{item.rt_pct_ats_combined}%</p>
                  </div>
                </div>
                <div className="odds"></div>
              </div>
            );
          })}
        </div>
      </div> */}
    </>
  );
}

export default Home;
