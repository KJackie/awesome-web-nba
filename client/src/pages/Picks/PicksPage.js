import React, { useContext, useEffect, useState } from 'react';
import MakePicks from './MakePicks';
import UserContext from '../../context/UserContext';
import axios from 'axios';
import domain from '../../util/domain';
import ShowPicks from './ShowPicks';
import moment from 'moment';
import HomeNavbar from '../../components/Navbar/HomeNavbar';
import './PicksPage.scss';
import Register from '../../components/Auth/Register';
import Login from '../../components/Auth/Login';
function PicksPage({ data, sortedGames }) {
	const [register, setRegister] = useState(false);
	const [login, setLogin] = useState(true);

	const { user } = useContext(UserContext);

	// store picks
	const [picks, setPicks] = useState([]);
	// store email
	const [email, setEmail] = useState('');
	// store username
	const [username, setUsername] = useState('');

	// Get current user from db
	async function getUser() {
		if (user)
			try {
				const userRes = await axios.get(`${domain}/loggedIn/${user}`);
				setEmail(userRes.data.email);
				setUsername(userRes.data.username);
			} catch (err) {
				console.log(err);
			}
	}
	getUser();

	// if user is true, get their picks
	useEffect(() => {
		if (!user) setPicks([]);
		else getPicks();
	}, [user]);

	// Get current user picks from db
	async function getPicks() {
		const pickRes = await axios.get(`${domain}/picks/`);
		setPicks(pickRes.data);
	}

	// Render the picks
	function renderPicks() {
		let sortedPicks = [...picks];
		// sort picks by most recent
		sortedPicks = sortedPicks.sort((a, b) => {
			return new Date(b.createdAt) - new Date(a.createdAt);
		});
		// return the sorted picks
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

	const [labels, setLabels] = useState([]);

	useEffect(() => {
		fetch(`${domain}/consensus`)
			.then((res) => res.json())
			.then((data) => {
				setLabels(data);
			});
	}, []);

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
	let gameDate = moment(data[1]?.date).format('MMMM DD');

	return (
		<div className='picks-page'>
			<HomeNavbar setRegister={setRegister} setLogin={setLogin} />
			<div className='content'>
				{picks.length < 0 && (
					<p className='content-date'>
						Make your picks for <br />
						<span>{gameDate}</span>
					</p>
				)}
				{!user && (
					<div className='no-user-msg'>
						<p> You must be signed in to make picks</p>
					</div>
				)}
				{picks.length > 0
					? renderPicks()
					: user && (
							<>
								<MakePicks
									data={data}
									addPicks={addPicks}
									pick={pick}
									setPick={setPick}
									labels={labels}
								/>
							</>
					  )}
			</div>
			{register && !user && (
				<Register setRegister={setRegister} setLogin={setLogin} />
			)}
			{login && !user && (
				<Login setLogin={setLogin} setRegister={setRegister} />
			)}
		</div>
	);
}

export default PicksPage;
