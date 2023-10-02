import React, { useState, useEffect } from "react";
import { userRunsRef } from "../helpers/data";
import { onValue } from "firebase/database";
import formatTime from "../helpers/formatTime";
import formatDate from "../helpers/formatDate";

function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [savedRuns, setSavedRuns] = useState({});

  const updateUserRuns = (data) => {
    setSavedRuns(data.val());
  };

  useEffect(() => {
    onValue(userRunsRef, updateUserRuns);
  }, []);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setButtonClicked(!showPopup);
  };

  return (
    <>
      <button onClick={togglePopup} disabled={buttonClicked} className="saveRunButton">
        View Upcoming Runs
      </button>
      {showPopup && (
        <>
          <div className="savedRuns">
            <h2>Saved Runs</h2>
            {Object.entries(savedRuns).map(([key, run]) => {
              const date = formatDate(new Date(run.date))
              const {duration} = run
              const selectedTime = run.selectedTime.toLowerCase()
              const time = formatTime(new Date(run[selectedTime]))

              return (
                  <section key={key}>
                    <h3>Your upcoming run on: {date}</h3>
                      {selectedTime === "sunrise" ? (
                        <p className="sunrise">Leave at {time} to catch the {selectedTime}.</p>
                        ) : (
                        <p className="sunset">For a {duration} minute round trip, leave at {time} to be back before {selectedTime}.</p>
                      )
                    }
                  </section>
              );
            })}
            <button onClick={togglePopup}>Close</button>
          </div>
        </>
      )}
    </>
  );
}

export default Popup;
