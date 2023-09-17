import { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";
import "react-widgets/styles.css";
import Header from "./components/Header";
import Location from "./components/Location";
import Calendar from "react-widgets/Calendar";
import Footer from "./components/Footer";
import Sunrise from "./assets/Sunrise";
import Sunset from "./assets/Sunset";

const geoUrl = " https://geocode.maps.co/search";
const sunUrl = "https://api.sunrise-sunset.org/json";

function App() {
  const [places, setPlaces] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("Sunrise");
  const [selectedLocation, setSelectedLocation] = useState(false);
  const [duration, setDuration] = useState(0)

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

  const handleSunSelection = (event) => {
    setSelectedTime(event.currentTarget.value);
  };

  const handleDuration = (event) => {
    setDuration(parseInt(event.target.value))
  }

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

    const sunrise = new Date (sunResponse.data.results.sunrise);
    const sunset = new Date (sunResponse.data.results.sunset);
    console.log(sunrise);
    console.log(sunset);

    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    const sunsetUserTimezone = new Date(sunset.toLocaleString("en-US", { timeZone: userTimeZone })
    );
    const sunriseUserTimezone = new Date(sunrise.toLocaleString("en-US", { timeZone: userTimeZone })
    );

    const sunsetRunStartTime = new Date(sunsetUserTimezone.getTime() - duration * 60 * 1000
    );

    const sunriseTimeFormatted = sunriseUserTimezone.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    const sunsetTimeFormatted = sunsetRunStartTime.toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

    console.log(`Leave at ${sunsetTimeFormatted} to run for ${duration} minutes before Sunset`);
    console.log(`Leave at ${sunriseTimeFormatted} to run at Sunrise` );
  };

  return (
    <>
      <div className="wrapper">
        <Header />
        <form onSubmit={handleSubmit}>
          <Calendar className="calendar" onChange={handleDateChange} />
          <Location 
            value={input}
            onChange={handleInputChange}
            places={places}
            showSuggestions={showSuggestions}
          />
          <div className='runTime'>
            <button className="sunrise" type="button" value="Sunrise" onClick={handleSunSelection}>
              <Sunrise />
            </button>
            <button className="sunset" type="button" value="Sunset" onClick={handleSunSelection}>
              <Sunset />
            </button>
          </div>
          {selectedTime === "Sunset" && 
            <>
              <label>How long would you like to run for?
                <select value={duration} onChange={handleDuration} required>
                  <option value="0" disabled={true}>Select a time</option>
                  <option value="10">10 minutes</option>
                  <option value="20">20 minutes</option>
                  <option value="30">30 minutes</option>
                  <option value="40">40 minutes</option>
                  <option value="50">50 minutes</option>
                  <option value="60">1 hour</option>
                </select>
              </label>
            </>
          }
          <button className="submit" disabled={!selectedLocation}>
            Let's go!
          </button>
          <p>{selectedTime}</p>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default App;
