import { useState, useEffect } from "react";
import "../styles/App.css";
import axios from "axios";
import Calendar from "react-widgets/Calendar";
import "react-widgets/styles.css";

const geoUrl = " https://geocode.maps.co/search";
const sunUrl = "https://api.sunrise-sunset.org/json";

function App() {
  const [places, setPlaces] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

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
      params: { lat, lng, formatted: 0 },
    });
    console.log(sunResponse);

    const sunrise = sunResponse.data.results.sunrise;
    const sunset = sunResponse.data.results.sunset;
    console.log(sunrise);
    console.log(sunset);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Enter your address"
        />
        {showSuggestions ? (
          <div className="suggestions">
            {places.map(({ display_name, place_id }) => (
              <button key={place_id} type="submit" value={place_id}>
                {display_name}
              </button>
            ))}
          </div>
        ) : null}
      </form>
      <Calendar />;
    </div>
  );
}

export default App;