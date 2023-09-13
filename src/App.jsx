import { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";
import Calendar from "react-widgets/Calendar";
import "react-widgets/styles.css";
import Header from "./components/Header";
import Sunrise from './assets/Sunrise'
import Sunset from './assets/Sunset'

const geoUrl = " https://geocode.maps.co/search";
const sunUrl = "https://api.sunrise-sunset.org/json";

function App() {
  const [places, setPlaces] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState(new Date())

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
    setDate(newDate)
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
      params: { lat, lng, formatted: 0,
        date: `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
      },
    });
    console.log(sunResponse);

    const sunrise = sunResponse.data.results.sunrise;
    const sunset = sunResponse.data.results.sunset;
    console.log(sunrise);
    console.log(sunset);
  };

  return (
    <>
      <div className="wrapper">
        <Header />
        <form onSubmit={handleSubmit}>
          <Calendar 
          className="calendar"
          onChange={handleDateChange} 
          />
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Enter your address"
            required
          />
          {showSuggestions ? (
            <div className="suggestions">
              {places.map(({ display_name, place_id }) => (
                <button key={place_id} type="submit" value={place_id}>
                  {display_name}
                </button>
              ))}
            </div>
          ) : (
            <div className="suggestionsHidden">
                {places.map(({ display_name, place_id }) => (
                  <button key={place_id} type="submit" value={place_id}>
                    {display_name}
                  </button>
                ))}
              </div> 
          )}
          <div className='runTime'>
            <button className="sunrise"><Sunrise /></button>
            <button className="sunset"><Sunset /></button>
          </div>
          <button className="submit">Let's go!</button>
        </form>
      </div>
    </>
  );
}

export default App;
