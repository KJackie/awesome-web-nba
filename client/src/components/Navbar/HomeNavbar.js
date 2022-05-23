import React, { useContext, useState } from 'react';
import './HomeNavbar.scss';
import { Link } from 'react-router-dom';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import domain from '../../util/domain';
import { FaCaretDown, FaUserAlt, FaBars } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import UserBox from './UserBox';
import Teams from './Dropdowns/Teams';

function Navbar({ setRegister, setLogin }) {
	const [showTeams, setShowTeams] = useState(false);

	function close() {
		setShowTeams(false);
	}

	const { user, logOut } = useContext(UserContext);

	// GET USERNAME AND FAV TEAM
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

	const history = useHistory();

	const [mobileNav, setMobileNav] = useState(false);
	const [userNav, setUserNav] = useState(false);

	return (
		<nav className='home-nav'>
			<div className='brand'>
				<Link to='/' className='link btn'>
					<p> NBA Pickem </p>
				</Link>
			</div>
			{/* navbar links for desktop view  */}
			<div className='desktop-links'>
				<ul>
					<Link to='/picks' className='link btn'>
						Your Picks
					</Link>
					<Link to='/pool' className='link btn'>
						Vew Pool
					</Link>

					{/* <li
						onMouseOver={() => setShowTeams(true)}
						onMouseOut={() => close()}
						className={showTeams ? 'active' : 'link'}>
						Teams
					</li> */}
				</ul>
				<Teams
					showTeams={showTeams}
					close={close}
					setShowTeams={setShowTeams}
				/>
			</div>

			{/* navbar links for mobile view */}
			<p onClick={() => setMobileNav(!mobileNav)} className='mobile-user'>
				<FaBars />
			</p>
			<div className={mobileNav ? 'dropdown' : 'hide'}>
				<div className='mobile-links'>
					<ul>
						<Link exact to='/' className='link btn'>
							Home
						</Link>
						<Link to='/picks' className='link btn'>
							Your Picks
						</Link>
						<Link to='/pool' className='link btn'>
							Vew Pool
						</Link>
						{/* <Link to='/games' className='link btn'>
							Games
						</Link> */}

						{user ? (
							<Link
								className='logout-btn btn'
								exact
								to='/picks'
								onClick={logOut}>
								Log out
							</Link>
						) : (
							<>
								<p
									className='link btn'
									onClick={() => {
										setRegister(true);
										setMobileNav(false);
									}}>
									Register
								</p>
								<p
									className='link btn last'
									onClick={() => {
										setLogin(true);
										setMobileNav(false);
									}}>
									Login
								</p>
							</>
						)}
					</ul>
				</div>
			</div>
			<div className='user-info'>
				{user ? (
					<p onClick={() => setUserNav(!userNav)} className='desktop-user'>
						{username}
						<FaCaretDown className='down-arrow' />
					</p>
				) : (
					<>
						<p
							className='register'
							onClick={() => {
								setRegister(true);
								setMobileNav(false);
							}}>
							Register
						</p>
						<p
							className='login'
							onClick={() => {
								setLogin(true);
								setMobileNav(false);
							}}>
							Login
						</p>
					</>
				)}

				{user && (
					<p onClick={() => setMobileNav(!mobileNav)} className='mobile-user'>
						<FaUserAlt />
						<FaCaretDown className='down-arrow' />
					</p>
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
		</nav>
	);
}

export default Navbar;
