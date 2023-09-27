import React, { useState } from "react";

function Popup() {
  const [showPopup, setShowPopup] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);

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
            <div className="savedRunsBox">
              <p className="dateOfRun">date of run</p>
              <p className="timeOfRun">time of run</p>
              {/* placeholders for design */}
              <button onClick={togglePopup}>Close</button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default Popup;
