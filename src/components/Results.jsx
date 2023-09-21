import React from "react";
import { Link } from "react-router-dom";
import formatTime from "../helpers/formatTime";


const Results = ({ sunset, sunrise, duration }) => {
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
      <p>{sunriseTimeFormatted}</p>
      <p>{sunsetTimeFormatted}</p>
      <Link to="/">GO BAAACK</Link>
    </>
  );
}

export default Results;