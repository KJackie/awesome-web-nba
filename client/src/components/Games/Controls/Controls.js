import React from "react";
import "./Controls.scss";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
function Controls({
  decrease,
  increase,
  gameDate,
}) {
  return (
    <div className="control-container">
      <div className="date-container">
        <AiOutlineMinus className="changer" onClick={decrease} />

        <p className="control-date"> {gameDate} </p>
        <AiOutlinePlus className="changer" onClick={increase} />
      </div>
    </div>
  );
}

export default Controls;
