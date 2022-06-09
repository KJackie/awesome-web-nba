import React, { useContext } from 'react'
import Login from '../../Auth/Login'
import Register from '../../Auth/Register'
import UserContext from '../../context/UserContext'
import Gamebar from '../../components/gamebar/Gamebar'
import './Home.scss'
const Home = ({ setRegister, setLogin, register, login, sortedGames, videos }) => {
 const { user } = useContext(UserContext);

 return (
  <div className='homepage'>
   <Gamebar sortedGames={sortedGames} />
   {register && !user && (
    <Register setRegister={setRegister} setLogin={setLogin} />
   )}
   {login && !user && (
    <Login setLogin={setLogin} setRegister={setRegister} />
   )}
   <div className="hero">
   </div>
  </div>
 )
}

export default Home