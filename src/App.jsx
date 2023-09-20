import { useState, useEffect } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from "react-router-dom";
import "../styles/App.css";
import axios from "axios";
import Calendar from "react-widgets/Calendar";
import "react-widgets/styles.css";
import Header from "./components/Header";
import Sunrise from "./assets/Sunrise";
import Sunset from "./assets/Sunset";

const geoUrl = " https://geocode.maps.co/search";
const sunUrl = "https://api.sunrise-sunset.org/json";

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <App />,
    },
  ]);

  return <RouterProvider router={router} />;
}

function App() {
  const [places, setPlaces] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("Sunrise");
  const [selectedLocation, setSelectedLocation] = useState(false);

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

  const handleTimeSelection = (event) => {
    setSelectedTime(event.currentTarget.value);
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

    const sunrise = sunResponse.data.results.sunrise;
    const sunset = sunResponse.data.results.sunset;
    console.log(sunrise);
    console.log(sunset);
  };

  return (
    <Router>
      <>
        <Routes>
          <Route
            path="/"
            element={
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
                      required
                      placeholder="Enter your address"
                    />
                    {/* this does cool thing!!! different class names with ternary statement*/}
                    <div
                      className={`suggestions ${
                        showSuggestions ? "" : "hidden"
                      }`}
                    >
                      {places.map(({ display_name, place_id }) => (
                        <button key={place_id} type="submit" value={place_id}>
                          {display_name}
                        </button>
                      ))}
                    </div>
                    <div className="runTime">
                      <button
                        className="sunrise"
                        type="button"
                        value="Sunrise"
                        onClick={handleTimeSelection}
                      >
                        <Sunrise />
                      </button>
                      <button
                        className="sunset"
                        type="button"
                        value="Sunset"
                        onClick={handleTimeSelection}
                      >
                        <Sunset />
                      </button>
                    </div>
                    <Link to="/results">
                      <button className="submit" disabled={!selectedLocation}>
                        Let's go!
                      </button>
                    </Link>
                    <p>{selectedTime}</p>
                  </form>
                </div>
              </>
            }
          />
          <Route
            path="/results"
            element={
              <>
                <h1>Test</h1>
              </>
            }
          />
        </Routes>
      </>
    </Router>
  );
}

export default App;
