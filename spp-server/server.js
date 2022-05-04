const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const schedule = require('node-schedule');

dotenv.config();

// set up express server
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());

app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:3000', 'https://www.nbapickem.org'],
		credentials: true,
	})
);
app.use(cookieParser());

app.use('/picks', require('../server/spp-server/routers/userPicksRouter'));
app.use('/pool', require('../server/spp-server/routers/poolRouter'));

app.use('/auth', require('../server/spp-server/routers/userRouter'));

app.use('/loggedIn', require('../server/spp-server/routers/loggedInRouter'));

// connect to mongodb

mongoose.connect(
	process.env.MDB_CONNECT_STRING,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	},
	(err) => {
		if (err) return console.error(err);
		console.log('Connected to MongoDB');
	}
);

//GAMEBAR API

app.get('/gamebar', async (req, res) => {
	const response = await axios.get(
		'https://api.nflpickwatch.com/v1/general/games/2021/142/nba'
	);
	const news = response.data;
	res.status(200).send(news);
});

// DISPLAY GAMES API

app.get('/games', async (req, res) => {
	const response = await axios.get(
		'https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?region=us&lang=en&contentorigin=espn&limit=100&calendartype=blacklist&includeModules=videos%2Ccards&dates=20220310&tz=America%2FNew_York&buyWindow=1m&showAirings=buy%2Clive&showZipLookup=true'
	);
	const news = response.data;
	res.status(200).send(news);
});

// NEWS API
app.get('/news', async (req, res) => {
	const response = await axios.get(
		'https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news'
	);
	const news = response.data;
	res.status(200).send(news);
});

//EXPERT PICKS

app.get('/expert-picks', async (req, res) => {
	const response = await axios.get(
		`https://api.nflpickwatch.com/v1/picks/nba/2021/${num}/su/combined/true/25/0`
	);
	const data = response.data;
	res.status(200).send(data);
});

let num = 196;

// CONSENSUS
app.get('/consensus', async (req, res) => {
	const response = await axios.get(
		`https://api.nflpickwatch.com/v1/general/games/2021/${num}/nba/REGULAR`
	);
	const data = response.data;
	res.status(200).send(data);
});

// TEAMS
app.get('/teams', async (req, res) => {
	const response = await axios.get(
		`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams`
	);
	const data = response.data;
	res.status(200).send(data);
});

// TEAM DETAILS
app.get('/teams/:team_id', async (req, res) => {
	const team_id = req.params.team_id;
	const response = await axios.get(
		`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team_id}`
	);
	const data = response.data;
	res.status(200).send(data);
});

// TEAM STATS
app.get('/stats/:team_id', async (req, res) => {
	const team_id = req.params.team_id;
	const response = await axios.get(
		`https://sports.core.api.espn.com/v2/sports/basketball/leagues/nba/seasons/2022/types/2/teams/${team_id}/statistics`
	);
	const data = response.data;
	res.status(200).send(data);
});

// TEAM STATS
app.get('/schedule/:team_id', async (req, res) => {
	const team_id = req.params.team_id;
	const response = await axios.get(
		`https://site.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${team_id}/schedule`
	);
	const data = response.data;
	res.status(200).send(data);
});

//https://fcast.espncdn.com/FastcastService/pubsub/profiles/12000/topic/event-basketball-nba/message/2309331/checkpoint

app.get('/schedule', async (req, res) => {
	const response = await axios.get(
		'https://datacrunch.9c9media.ca/statsapi/sports/basketball/leagues/nba/scoreboard?brand=tsn'
	);

	const news = response.data;
	res.status(200).send(news);
});

app.listen(PORT, () =>
	console.log(`Hello Master Bweem, the server is running on ${PORT}.`)
);
