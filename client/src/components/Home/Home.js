import React, { useContext } from "react";
import "./Home.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import DemoLogin from "../Auth/DemoLogin";
function Home() {
  const { user } = useContext(UserContext);

  return (
    <div className="home-page">
      <div className="title">
        <div className="home-text">
          {/* <h1> Daily NBA Pick'em </h1> */}
          <h1>
            {" "}
            Daily NBA <br /> Pick 'em Pool
          </h1>
          <p> Make picks and compete.</p>
        </div>
        <div className="btn-container-home">
          {user ? (
            <>
              <Link to="/picks" className="link btn">
                Picks
              </Link>
              <Link to="/pool" className="link btn">
                Pool
              </Link>
            </>
          ) : (
            <>
              <Link to="/register" className="link btn">
                Register
              </Link>
              <Link to="/login" className="link btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="guest-login">
        <p> Sign in as a guest and check out the site before signing up.</p>
        <DemoLogin />
      </div>
      {/* <div className="image">
        <img src="../images/guy.png" alt="" />
        
      </div> */}
    </div>
  );
}

export default Home;
