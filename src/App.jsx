import { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";
import Calendar from "react-widgets/Calendar";
import "react-widgets/styles.css";
import Header from "./components/Header";
import Sunrise from "./assets/Sunrise";
import Sunset from "./assets/Sunset";

const geoUrl = " https://geocode.maps.co/search";
const sunUrl = "https://api.sunrise-sunset.org/json";

function App() {
  const [places, setPlaces] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(null);
  const [timeResult, setTimeResult] = useState("");
  const [isInputEmpty, setInputEmpty] = useState(true);

  useEffect(() => {
    setInputEmpty(input.trim() === "");
  }, [input]);

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
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTimeSelection = (time) => {
    setSelectedTime(time);
  };

  const handleLetsGoClick = async () => {
    console.log(places);

    const place_id = parseInt(places[0]?.place_id);
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

    const sunrise = sunResponse.data.results.sunrise;
    const sunset = sunResponse.data.results.sunset;
    console.log(sunrise);
    console.log(sunset);

    if (selectedTime === "Sunrise") {
      setTimeResult(`Sunrise time: ${sunrise}`);
    } else if (selectedTime === "Sunset") {
      setTimeResult(`Sunset time: ${sunset}`);
    }
  };

  return (
    <>
      <div className="wrapper">
        <Header />
        <form>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            required
            placeholder="Enter your address"
            required
          />
          {showSuggestions && places.length > 0 ? (
            <div className="suggestions">
              {places.map(({ display_name, place_id }) => (
                <button
                  key={place_id}
                  onClick={() => {
                    setInput(display_name);
                    setShowSuggestions(false);
                  }}
                >
                  {display_name}
                </button>
              ))}
            </div>
          ) : null}
          <Calendar className="calendar" onChange={handleDateChange} />
          <div className="runTime">
            <button
              className="sunrise"
              type="button"
              onClick={() => handleTimeSelection("Sunrise")}
            >
              <Sunrise />
            </button>
            <button
              className="sunset"
              type="button"
              onClick={() => handleTimeSelection("Sunset")}
            >
              <Sunset />
            </button>
          </div>
          <button
            className="submit"
            type="button"
            onClick={handleLetsGoClick}
            disabled={isInputEmpty}
          >
            Let's go!
          </button>
          {timeResult && <p>{timeResult}</p>}
        </form>
      </div>
    </>
  );
}

export default App;