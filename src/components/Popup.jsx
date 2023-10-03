import React, { useState, useEffect } from "react";
import { userRunsRef } from "../helpers/data";
import { onValue, child, remove } from "firebase/database";
import formatTime from "../helpers/formatTime";
import formatDate from "../helpers/formatDate";
import NoRuns from "./NoRuns";

function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [savedRuns, setSavedRuns] = useState({});

  const updateUserRuns = (data) => {
    setSavedRuns(data.val());
  };

  const handleRemoveRun = (event) => {
    const key = event.currentTarget.value
    const runRef = child(userRunsRef, key)
    remove(runRef)
  }

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
            <h2>Scheduled runs</h2>
            {savedRuns ? Object.entries(savedRuns).map(([key, run]) => {
              const date = formatDate(new Date(run.date))
              const {duration} = run
              const selectedTime = run.selectedTime.toLowerCase()
              const time = formatTime(new Date(run[selectedTime]))

              return (
                  <section className="runs" key={key}>
                    <div className="date">
                      <h3>{date}</h3>
                      <button className="removeRunButton" value={key} onClick={handleRemoveRun}>x</button>
                    </div>
                      {selectedTime === "sunrise" ? (
                        <p className="sunrise">Leave at {time} to catch the {selectedTime}.</p>
                        ) : (
                        <p className="sunset">For a {duration} minute round trip, leave at {time} to be back before {selectedTime}.</p>
                      )
                    }
                  </section>
              );
            }) : <NoRuns />}
            <button onClick={togglePopup}>Close</button>
          </div>
        </>
      )}
    </>
  );
}

export default Popup;
