import React, { useState, useEffect } from "react";
import "./BetCalc.scss";
import domain from "../../util/domain";
function BetCalc() {
  const [games, setGames] = useState([]);

  useEffect(() => {
    fetch(
      `https://site.web.api.espn.com/apis/v2/scoreboard/header?sport=basketball&league=nba`
    )
      .then((res) => res.json())
      .then((data) => {
        setGames(data.sports[0].leagues[0].events);
      });
  }, []);

  console.log(games);

  // CALCULATE BETS
  const [wager, setWager] = useState(0);
  const [odds, setOdds] = useState(0);
  const [totalWinnings, setTotalWinnings] = useState(0);
  const [payout, setPayout] = useState(0);

  let divide = 0;
  let profit = 0;

  function calculateBet(wager) {
    if (odds < 0) {
      divide = odds / 100;
      divide *= -1;
    } else {
      divide = 100 / odds;
    }
    profit = wager / divide;
    setPayout(profit.toFixed(2));
    let sum = +wager + +profit;
    setTotalWinnings(sum.toFixed(2));
  }

  return (
    <div className="bet-calc-page">
      <div className="left">
        <div className="title">
          <h1> Betting Odds Calculator </h1>
          <p>
            Input your stake for any NBA bet and see what your payout will be.
            Odds are subject to change.
          </p>
        </div>
        <div className="game-boxes">
          {games.map((item, index) => {
            return (
              <div className="box">
                {item.gamecastAvailable && (
                  <div className="game-info">
                    <div className="live-icon">Live</div>
                    <div className="game-clock">
                      <p>{item.fullStatus.type.detail}</p>
                    </div>
                  </div>
                )}
                <div className="home">
                  <div className="team-name">
                    <img
                      src={`../icons/${item?.competitors[0].abbreviation}.svg`}
                      className="team-logo"
                      alt=""
                    />
                    <h1>{item.competitors[0].name}</h1>
                    <p className="score">{item.competitors[0].score}</p>
                  </div>
                  <div className="team-odds">
                    {/* SPREAD */}
                    <div
                      className="odd-box"
                      onClick={() => setOdds(item.odds.homeTeamOdds.spreadOdds)}
                    >
                      <h1>{item.odds.spread}</h1>
                      <p>{item.odds.homeTeamOdds.spreadOdds}</p>
                    </div>
                    {/* OVER | UNDER  */}
                    <div
                      className="odd-box"
                      onClick={() => setOdds(item.odds.overOdds)}
                    >
                      <h1>{item.odds.overUnder}</h1>
                      <p>{item.odds.overOdds}</p>
                    </div>
                    {/* MONEYLINE */}
                    <div
                      className="odd-box"
                      onClick={() => setOdds(item.odds.home.moneyLine)}
                    >
                      <p>{item.odds.homeTeamOdds.moneyLine}</p>
                    </div>
                  </div>
                </div>
                <div className="road">
                  <div className="team-name">
                    <img
                      src={`../icons/${item?.competitors[1].abbreviation}.svg`}
                      className="team-logo"
                      alt=""
                    />
                    <h1>{item.competitors[1].name}</h1>
                    <p className="score">{item.competitors[1].score}</p>
                  </div>
                  <div className="team-odds">
                    {/* SPREAD */}
                    <div
                      className="odd-box"
                      onClick={() => setOdds(item.odds.awayTeamOdds.spreadOdds)}
                    >
                      <h1>{item.odds.spread}</h1>

                      <p>{item.odds.awayTeamOdds.spreadOdds}</p>
                    </div>
                    {/* OVER | UNDER  */}
                    <div
                      className="odd-box"
                      onClick={() => setOdds(item.odds.underOdds)}
                    >
                      <h1>{item.odds.overUnder}</h1>
                      <p>{item.odds.underOdds}</p>
                    </div>
                    {/* MONEYLINE */}
                    <div
                      className="odd-box"
                      onClick={() => setOdds(item.odds.away.moneyLine)}
                    >
                      <p>{item.odds.awayTeamOdds.moneyLine}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="right">
        <div className="calculator">
          <div className="wager-input bet-box">
            <h1> Bet Amount </h1>
            <p> Choose the amount of money you want to bet</p>
            <input
              type="number"
              name="wager"
              onChange={(e) => setWager(e.target.value)}
            />
        
          </div>
          <div className="view-odds bet-box ">
            <h1> Odds </h1>
            <p> Choose the odds by clicking on the box of your choice</p>
            <div className="odds">
              <p>{odds}</p>
            </div>
          </div>
          <button onClick={() => calculateBet(wager)}>Calculate</button>

          <div className="payout bet-box">
            <h1>Payout</h1>
            <div className="total-winnings">
              <p>{totalWinnings}</p>
            </div>
            <div className="view-payout">
              <h1>Profit</h1>
              <p>{payout} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BetCalc;
