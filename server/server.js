const express = require("express");
const axios = require("axios");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

// set up express server
const app = express();
const PORT = process.env.PORT || 3333;
app.use(express.json());

// cors
app.use(
  cors({
    origin: ["http://localhost:3000", "https://www.nbapickem.org/"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/picks", require("./routers/userPicksRouter"));
app.use("/pool", require("./routers/poolRouter"));
app.use("/auth", require("./routers/userRouter"));
app.use("/loggedIn", require("./routers/loggedInRouter"));

// connect to mongodb

mongoose.connect(
  process.env.MDB_CONNECT_STRING,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Connected to MongoDB");
  }
);

//GAMEBAR API

app.get("/gamebar", async (req, res) => {
  const response = await axios.get(
    "https://api.nflpickwatch.com/v1/general/games/2021/142/nba"
  );
  const data = response.data;
  res.status(200).send(data);
});

//EXPERT PICKS

app.get("/expert-picks", async (req, res) => {
  const response = await axios.get(
    "https://api.nflpickwatch.com/v1/picks/nba/2021/167/su/combined/true/25/0"
  );
  const data = response.data;
  res.status(200).send(data);
});

// GAMES API
app.get("/games", async (req, res) => {
  const response = await axios.get(
    "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard?region=us&lang=en&contentorigin=espn&limit=100&calendartype=blacklist&includeModules=videos%2Ccards&dates=20220310&tz=America%2FNew_York&buyWindow=1m&showAirings=buy%2Clive&showZipLookup=true"
  );
  const data = response.data;
  res.status(200).send(data);
});
// NEWS API
app.get("/news", async (req, res) => {
  const response = await axios.get(
    "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/news"
  );
  const news = response.data;
  res.status(200).send(news);
});
// SCHEDULE API
app.get("/schedule", async (req, res) => {
  const response = await axios.get(
    "https://datacrunch.9c9media.ca/statsapi/sports/basketball/leagues/nba/scoreboard?brand=tsn"
  );
  const data = response.data;
  res.status(200).send(data);
});
app.listen(PORT, () =>
  console.log(`Hello Master Bweem, the server is running on ${PORT}.`)
);
