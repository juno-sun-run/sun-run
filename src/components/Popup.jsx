import React, { useState } from "react";

function Popup() {
  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
      <button onClick={togglePopup}>Saved Runs</button>
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
