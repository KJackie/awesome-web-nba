import React from 'react';
import './UserBox.scss';
import { Link } from 'react-router-dom';

function UserBox({ username, favTeam, user, logOut }) {
	return (
		<div className='user-box-contents'>
			<div className='user-box-top'>
				<p>{username}</p>
				<img src={`../mlb-icons/${favTeam}.svg`} className='team-logo' alt='' />
			</div>
			<div className='user-links'>
				<Link to='/picks' className='link btn'>
					Your Picks
				</Link>
				<Link to='/pool' className='link btn'>
					Vew Pool
				</Link>
			</div>
			{user ? (
				<div className='user-controls'>
					<button className='logout-btn btn' s onClick={logOut}>
						Log out
					</button>
				</div>
			) : (
				<div className='user-controls'>
					<p> You are not signed in. </p>
				</div>
			)}
		</div>
	);
}

export default UserBox;
