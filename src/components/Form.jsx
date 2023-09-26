import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar } from "react-widgets";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import RunTime from "./RunTime";
import Location from "./Location";
import getUserTimezoneDate from "../helpers/getUserTimezoneDate";

const Form = ({ handleShit }) => {
  const [places, setPlaces] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("Sunrise");
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [duration, setDuration] = useState(0);

  const geoUrl = "https://geocode.maps.co/search";
  const sunUrl = "https://api.sunrise-sunset.org/json";

  const handleInputChange = async (event) => {
    const userAddress = event.target.value;
    setInput(userAddress);
    setShowSuggestions(true);

    try {
      const geoResponse = await axios({
        url: geoUrl,
        method: "GET",
        dataResponse: "json",
        params: { q: userAddress },
      });
      setPlaces(geoResponse.data);
      setSelectedLocation(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSelectedLocation(false);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleSunSelection = ({ currentTarget: { value: selectedTime }}) => {
    setSelectedTime(selectedTime);
    handleShit({ selectedTime });
  };

  const handleDuration = ({ target: { value: duration }}) => {
    setDuration(duration);
    handleShit({ duration });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(places);

    const place_id = parseInt(event.nativeEvent.submitter.value);
    const selected = places.find((place) => place.place_id === place_id);
    const { lat, lon: lng } = selected;
    setInput(selected.display_name);
    setShowSuggestions(false);

    console.log(selected);

    const sunResponse = await axios({
      url: sunUrl,
      method: "GET",
      dataResponse: "json",
      params: {
        lat,
        lng,
        formatted: 0,
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
      },
    });
    console.log(sunResponse);

    const sunrise = getUserTimezoneDate(new Date(sunResponse.data.results.sunrise));
    const sunset = getUserTimezoneDate(new Date(sunResponse.data.results.sunset));
    console.log(sunrise);
    console.log(sunset);
    handleShit({ sunrise, sunset, selectedTime });
  };

  return (
    <div className="columnsContainer">
      <div className="leftColumn">
        <form onSubmit={handleSubmit}>
          <Calendar className="calendar" onChange={handleDateChange} />
          <Location
            value={input}
            onChange={handleInputChange}
            places={places}
            showSuggestions={showSuggestions}
          />
          </form>
        </div>
        <div className="rightColumn">
          <RunTime
            selectedTime={selectedTime}
            duration={duration}
            handleSunSelection={handleSunSelection}
            handleDuration={handleDuration}
          />
          <Link to="/results">
            <button
              className="submit"
              disabled={!selectedLocation}
            >
              Let's go!
            </button>
          </Link>
        </div>
    </div>
  );
}

export default Form;