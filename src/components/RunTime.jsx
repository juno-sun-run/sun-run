import React from "react";
import Sunrise from "../assets/Sunrise";
import Sunset from "../assets/Sunset";

function RunTime({ selectedTime, duration, handleSunSelection, handleDuration }) {
  return (
    <div className="runTime">
      <button
        className="sunrise"
        type="button"
        value="Sunrise"
        onClick={handleSunSelection}
      >
        <Sunrise />
      </button>
      <button
        className="sunset"
        type="button"
        value="Sunset"
        onClick={handleSunSelection}
      >
        <Sunset />
      </button>
      {selectedTime === "Sunset" && (
        <label>
          How long would you like to run for?
          <select value={duration} onChange={handleDuration} required>
            <option value="0" disabled={true}>
              Select a time
            </option>
            <option value="10">10 minutes</option>
            <option value="20">20 minutes</option>
            <option value="30">30 minutes</option>
            <option value="40">40 minutes</option>
            <option value="50">50 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </label>
      )}
    </div>
  );
}

export default RunTime;