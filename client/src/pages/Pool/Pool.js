import React, { useContext, useEffect, useState } from 'react';
import './Pool.scss';
import axios from 'axios';
import domain from '../../util/domain';
import UserContext from '../../context/UserContext';
import UserPicks from './UserPicks/UserPicks';
import PoolLabels from './PoolLabels/PoolLabels';
import ExpertPicks from './ExpertPicks/ExpertPicks';
function Pool() {
	let [poolData, setPoolData] = useState([]);
	const [data, setData] = useState([]);

	async function getAllPicks() {
		let data = await axios.get(`${domain}/pool/`);
		setPoolData(data.data);
	}

	// delete picks once every day
	useEffect(() => {
		setInterval(function () {
			let date = new Date();
			if (date.getHours() === 22 && date.getMinutes() === 41) {
				axios.delete(`${domain}/picks/`);
			}
		}, 1000);
	}, []);

	// GET USERNAME
	const { user } = useContext(UserContext);

	const [username, setUsername] = useState('');
	async function getUser() {
		const userRes = await axios.get(`${domain}/loggedIn/${user}`);
		setUsername(userRes.data.username);
	}
	getUser();

	useEffect(() => {
		fetch(`${domain}/schedule`)
			.then((res) => res.json())
			.then((data) => {
				setData(data[1].eventList);
			});
	}, []);

	const [expertPicks, setExpertPicks] = useState([]);

	useEffect(() => {
		fetch(`${domain}/expert-picks`)
			.then((res) => res.json())
			.then((data) => {
				setExpertPicks(data.picks);
			});
	}, []);

	const [labels, setLabels] = useState([]);

	useEffect(() => {
		fetch(`${domain}/consensus`)
			.then((res) => res.json())
			.then((data) => {
				setLabels(data);
			});
	}, []);

	useEffect(() => {
		getAllPicks();
	}, []);

	var sortedGames = data.sort(function (a, b) {
		return a.eventId - b.eventId;
	});

	return (
		<div className='pool'>
			<PoolLabels labels={labels} />

			<div className='all-picks'>
				{poolData.map((item, index) => {
					return <UserPicks item={item} labels={labels} />;
				})}
				{expertPicks.map((item, i) => {
					return <ExpertPicks item={item} labels={labels} />;
				})}
			</div>
		</div>
	);
}

export default Pool;
