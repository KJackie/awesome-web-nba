import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import domain from './util/domain';

import PicksPage from './pages/Picks/PicksPage';
import Pool from './pages/Pool/Pool';

function Router() {
	const [data, setData] = useState([]);
	const [games, setGames] = useState([]);

	useEffect(() => {
		fetch(`${domain}/schedule`)
			.then((res) => res.json())
			.then((data) => {
				setData(data[1].eventList);
			});
	}, []);

	var sortedGames = data.sort(function (a, b) {
		return a.eventId - b.eventId;
	});

	const [gameAPI, setGameAPI] = useState([]);

	let today = new Date();
	var res = today.toISOString().slice(0, 10).replace(/-/g, '');
	let theDate = Number(res);

	let [date, setDate] = useState(theDate);

	useEffect(() => {
		fetch(
			`https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?region=us&lang=en&contentorigin=espn&limit=100&calendartype=blacklist&includeModules=videos%2Ccards&dates=${date}&tz=America%2FNew_York&buyWindow=1m&showAirings=buy%2Clive&showZipLookup=true`
		)
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				setGameAPI(data);
			});
	}, [theDate, date]);

	return (
		<BrowserRouter>
			<Switch>
				<Route exact path='/'>
					<Home gameAPI={gameAPI} />
				</Route>
				<Route exact path='/picks'>
					<PicksPage data={data} sortedGames={sortedGames} />
				</Route>
				<Route exact path='/pool'>
					<Pool />
				</Route>
			</Switch>
		</BrowserRouter>
	);
}

export default Router;
