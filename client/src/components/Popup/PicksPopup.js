import React from "react";
import "./PicksPopup.scss";
import { Link } from "react-router-dom";
import { BsArrowRight } from "react-icons/bs";

function PicksPopup({ pick, setPopUp, addPicks, setPick }) {
  return (
    <div className="popup-container">
      <div className="popup-content">
        <h1> Your Picks </h1>
        <div className="chosen-picks">
          {pick.map((item) => {
            if (item !== "no-pick") {
              return (
                <img
                  src={`../icons/${item}.svg`}
                  className="popup-logo"
                  alt=""
                />
              );
            }
          })}
        </div>
        <p className="mobile-info">
          Scroll to see all your picks <BsArrowRight />
        </p>

        <div className="btn-container-popup">
          <button
            className="edit-btn"
            onClick={() => {
              setPopUp(false);
              setPick([]);
            }}
          >
            Edit
          </button>
          <Link className="save-btn" onClick={addPicks} to="/pool">
            Save Picks
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PicksPopup;
