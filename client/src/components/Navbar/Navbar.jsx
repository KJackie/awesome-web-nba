import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import { FaCaretDown } from 'react-icons/fa'
import Login from '../../Auth/Login';
import Register from '../../Auth/Register'
import './Navbar.scss';
import UserContext from '../../context/UserContext';
import domain from '../../util/domain';
import UserBox from './UserBox';


const Navbar = ({ setRegister, setLogin }) => {
 const [userNav, setUserNav] = useState(false);

 const { user, logOut } = useContext(UserContext);

 // Get username and favorite team
 const [username, setUsername] = useState('');
 const [favTeam, setFavTeam] = useState('');

 async function getUser() {
  if (user) {
   const userRes = await axios.get(`${domain}/loggedIn/${user}`);
   setUsername(userRes.data.username);
   setFavTeam(userRes.data.favoriteTeam);
  }
 }
 getUser();

 const register = () => {
  setRegister(true);
 }

 const login = () => {
  setLogin(true);
 }

 return (
  <nav>
   <div className="logo">
    <Link to='/'>Pickem</Link>
   </div>
   <div className="nav-links">
    <ul>
     <Link to='/picks'>Make Picks</Link>
     <Link to='/pool'>View Pool</Link>
    </ul>
   </div>
   <div className="controls">
    {user ? (
     <p onClick={() => setUserNav(!userNav)} className='desktop-user'>
      {username}
      <FaCaretDown className='down-arrow' />
     </p>
    ) : (
     <>
      <p
       className='register'
       onClick={register}>
       Register
      </p>
      <p
       className='login'
       onClick={login}>
       Login
      </p>
     </>
    )}
   </div>
   <div className={userNav ? 'user-sub-nav' : 'hide'}>
    <UserBox
     username={username}
     favTeam={favTeam}
     user={user}
     logOut={logOut}
    />
   </div>

  </nav >
 )
}

export default Navbar