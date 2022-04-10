import React, { useState } from "react";
import "./MakePicks.scss";
import $ from "jquery";
import PickInstructions from "./PickInstructions";
import PicksPopup from "../Popup/PicksPopup";
import PickBox from "./PickBox/PickBox";

function MakePicks({ data, pick, setPick, addPicks, labels }) {
  const [locked, setLocked] = useState(true);
  const [popUp, setPopUp] = useState(false);

  function handleSubmit() {
    let radios = document.querySelectorAll("#radio");
    for (let i = 0; i < radios.length; i++) {
      if (radios[i].checked) {
        setPick((prevState) => [...prevState, radios[i].value]);
      }
    }
  }

  // set background color for selected teams.
  $(document).ready(function () {
    $("input:radio").change(function () {
      var $this = $(this);
      $this.closest(".game").find("label.highlight").removeClass("highlight");
      $this.closest(".box").addClass("highlight");
    });
  });

  return (
    <div className="make-picks-page">
      {/* SHOW POPUP AFTER CHOOSING PICKS */}
      {popUp ? (
        <div className="popup">
          <PicksPopup
            addPicks={addPicks}
            pick={pick}
            setPopUp={setPopUp}
            setPick={setPick}
          />
        </div>
      ) : (
        // SHOW GAMES
        <div className="make-picks-content">
          <div className="instructions-section">
            <PickInstructions data={data} />
          </div>

          {/* RENDER GAME BOXES  */}
          <div className="games-container">
            {labels.map((item, index) => {
              return <PickBox item={item} index={index} />;
            })}

            {/* CHOOSE PICKS BUTTON  */}
            <div className="btn-container">
              <button
                onClick={() => {
                  handleSubmit();
                  setLocked(false);
                  setPopUp(true);
                }}
                className="add-btn"
              >
                Add Picks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MakePicks;
