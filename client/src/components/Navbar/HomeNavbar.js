import React, { useContext, useState } from "react";
import "./HomeNavbar.scss";
import { Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import axios from "axios";
import domain from "../../util/domain";
import { FaCaretDown, FaUserAlt } from "react-icons/fa";
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

  const history = useHistory();

  // LOGOUT USER
  async function logOut() {
    await axios.get(`${domain}/auth/logOut`);
    await getUser();
    history.push("/");
  }

  const [mobileNav, setMobileNav] = useState(false);
  const [userNav, setUserNav] = useState(false);

  return (
    <nav className="home-nav">
      <div className="brand">
        <Link to="/" className="link btn">
          <img src="../images/logo.svg" className="logo" alt="logo" />
        </Link>
      </div>
      <div className="desktop-links">
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
          {user && (
            <>
              <Link to="/picks" className="link btn">
                Picks
              </Link>
              <Link to="/pool" className="link btn">
                Pool
              </Link>
            </>
          )}
        </ul>
      </div>

      <div className={mobileNav ? "dropdown" : "hide"}>
        <div className="links">
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
          </ul>
        </div>
      </div>
      <div className="user-info">
        {user ? (
          <p onClick={() => setUserNav(!userNav)} className="desktop-user">
            {username}
            <FaCaretDown className="down-arrow" />
          </p>
        ) : (
          <>
            <Link to="/register" className="register">
              Register
            </Link>
            <Link to="/login" className="link">
              Login
            </Link>
          </>
        )}

        {user && (
          <p onClick={() => setUserNav(!userNav)} className="mobile-user">
            <FaUserAlt />
            <FaCaretDown className="down-arrow" />
          </p>
        )}
      </div>
      <div className={userNav ? "user-sub-nav" : "hide"}>
        <UserBox
          username={username}
          favTeam={favTeam}
          user={user}
          logOut={logOut}
        />
      </div>
    </nav>
  );
}

export default Navbar;
