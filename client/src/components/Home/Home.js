import React, { useContext, useState, useEffect } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import DemoLogin from "../Auth/DemoLogin";
import domain from "../../util/domain";
function Home({ gameAPI }) {
  const { user } = useContext(UserContext);

  const [consensus, setConsensus] = useState([]);

  useEffect(() => {
    fetch(`${domain}/consensus`)
      .then((res) => res.json())
      .then((data) => {
        setConsensus(data);
      });
  }, []);

  return (
    <>
      <div className="home-page">
        {!user ? (
          <div className="left">
            <div className="title">
              <div className="home-text">
                <h1> Join the Pool </h1>

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
        ) : (
          <div className="left">
            <div className="title">
              <div className="home-text">
                <h1> Todays Top Picks </h1>

                <p>The experts most confident picks.</p>
              </div>
            </div>
          </div>
        )}
        <div className="right">
          <div className="demo-bar first">
            {consensus.map((item, index) => {
              if (item.ht_pct_ats_experts > 40) {
                return (
                  <div className="demo-bar-content" key={index}>
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
                        <p>{item?.rt_pct_ats_combined}% </p>
                        <p> vs </p>
                        <p>{item?.ht_pct_ats_combined}% </p>
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
                  </div>
                );
              }
            })}
          </div>
          <div className="demo-bar second">
            {consensus.map((item, index) => {
              if (item.rt_pct_ats_experts > 60) {
                return (
                  <div className="demo-bar-content" key={index}>
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
                        <p>{item?.rt_pct_ats_combined}% </p>
                        <p> vs </p>
                        <p>{item?.ht_pct_ats_combined}% </p>
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
                  </div>
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
              <div className="video-box" key={index}>
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
    </>
  );
}

export default Home;
