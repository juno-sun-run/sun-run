import React from "react";
import { Link } from "react-router-dom";
import formatTime from "../helpers/formatTime";
import Sunrise from "../assets/Sunrise";
import Sunset from "../assets/Sunset";

const Results = ({ sunset, sunrise, duration, selectedTime }) => {
  if (!sunrise || !sunset) return null;

  const sunsetRunStartTime = new Date(sunset.getTime() - duration * 60 * 1000);

  const sunriseTimeFormatted = formatTime(sunrise);
  const sunsetTimeFormatted = formatTime(sunsetRunStartTime);

  console.log(
    `Leave at ${sunsetTimeFormatted} to run for ${duration} minutes before Sunset`
  );
  console.log(`Leave at ${sunriseTimeFormatted} to run at Sunrise`);
  return (
    <>
      <div className="resultsContainer">
        {selectedTime === "Sunset" ? (
          <>
            <p>Start your run at {sunsetTimeFormatted}!</p>
            <Sunset />
          </>
        ) : (
          <>
            <p>Start your run at {sunriseTimeFormatted}!</p>
            <Sunrise />
          </>
        )}
      </div>
      <Link to="/">
        <button className="back">Go Back</button>
      </Link>
    </>
  );
};

export default Results;
