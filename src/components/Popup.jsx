import React, { useState, useEffect } from "react";
import { userRunsRef } from "../helpers/data";
import { onValue, update } from "firebase/database";
import formatTime from "../helpers/formatTime";

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
      <button onClick={togglePopup} disabled={buttonClicked}>
        Saved Runs
      </button>
      {showPopup && (
        <>
          <div className="savedRuns">
            <h3>Saved Runs</h3>
            {Object.entries(savedRuns).map(([key, run]) => {
              return (
                <ul key={key}>
                  <li>Sunrise: {formatTime(new Date(run.sunrise))}</li>
                  <li>Sunset: {formatTime(new Date(run.sunset))}</li>
                  <li>Duration: {run.duration}</li>
                  <li>Selected Time: {run.selectedTime}</li>
                </ul>
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
