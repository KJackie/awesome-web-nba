import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import domain from "../../util/domain";
import "./Navbar.scss";
import { FaBars, FaUserAlt, FaCaretDown } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import UserBox from "./UserBox";
function Navbar() {
  const { user } = useContext(UserContext);

  // GET USERNAME AND FAV TEAM
  const [username, setUsername] = useState("");
  const [favTeam, setFavTeam] = useState("");
  async function getUser() {
    const userRes = await axios.get(`${domain}/loggedIn/${user}`);
    setUsername(userRes.data.username);
    setFavTeam(userRes.data.favoriteTeam);
  }
  getUser();


  // LOGOUT USER
  async function logOut() {
    await axios.get(`${domain}/auth/logOut`);
    await getUser();
  }

  const [mobileNav, setMobileNav] = useState(false);
  const [userNav, setUserNav] = useState(false);

  return (
    <nav className="navbar">
      <div className="top">
        <div className="brand">
          <Link to="/" className="link btn">
            <img src="../images/logo.svg" className="logo" alt="logo" />
          </Link>
        </div>
        <div className="user-info">
          {user ? (
            <>
              <p
                onClick={() => setMobileNav(!mobileNav)}
                className="mobile-user"
              >
                <FaUserAlt />
                <FaCaretDown className="down-arrow" />
              </p>
              
              <p
                onClick={() => setMobileNav(!mobileNav)}
                className="desktop-user"
              >
                {username}
                <FaUserAlt />
              </p>
              
            </>
          ) : (
            <>
              <Link to="/register" className="sign-btn">
                Register
              </Link>
              <Link to="/login" className="sign-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
      <div className={mobileNav ? "dropdown" : "hide"}>
        <div className="mobile-links">
          <ul>
            <Link to="/" className="link btn">
              Home
            </Link>
            <Link to="/picks" className="link btn">
              Your Picks
            </Link>
            <Link to="/pool" className="link btn">
              Vew Pool
            </Link>
            <Link to="/games" className="link btn">
              Games
            </Link>
            
            {user ? (
              <Link className="logout-btn btn" onClick={logOut}>
                Log out
              </Link>
            ) : (
              <>
                <Link to="/register" className="link btn">
                  Register
                </Link>
                <Link to="/login" className="link btn last">
                  Login
                </Link>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="bottom">
        <div className="links">
          <ul>
            <Link to="/picks" className="link btn">
              Your Picks
            </Link>
            <Link to="/pool" className="link btn">
              Vew Pool
            </Link>
            <Link to="/games" className="link btn">
              Games
            </Link>
            <Link to="/betcalculator" className="link btn">
              Bet Calculator
            </Link>
          </ul>
          <div className="burger">
            <FaBars onClick={() => setUserNav(!userNav)} />
          </div>
          <div className={userNav ? "user-sub-nav" : "hide"}>
            <UserBox
              username={username}
              favTeam={favTeam}
              user={user}
              logOut={logOut}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
