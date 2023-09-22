import React from "react";
import { Link } from "react-router-dom";
import formatTime from "../helpers/formatTime";


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
    {selectedTime === "Sunset" ? (
      <p>Start your run at {sunsetTimeFormatted}!</p>
    ) : (
      <p>Start your run at {sunriseTimeFormatted}!</p>
    )}
      <p>{selectedTime}</p>
      <Link to="/">GO BAAACK</Link>
    </>
  );
}

export default Results;