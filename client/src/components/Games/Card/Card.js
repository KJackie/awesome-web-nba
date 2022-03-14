import React from "react";
import "./Card.scss";
import GameCard from "./GameCard";
function Card({ games, filterGames }) {
  return (
    <div className={filterGames ? "card-container-reverse" : "card-container-wrap"}>
      {games?.events?.map((item, index) => {
        return (
          <GameCard data={item} key={index}  />
        );
      })}
    </div>
  );
}

export default Card;
