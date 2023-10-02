import { useState, useEffect } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import "../styles/App.css";
import "react-widgets/styles.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Results from "./components/Results";
import Footer from "./components/Footer";
import firebase from "./components/Firebase.jsx";
import { getDatabase, ref, child, onValue, set, push } from "firebase/database";
import Popup from "./components/Popup";

// global variables
const database = getDatabase(firebase);
const dbRef = ref(database);
const allUserRunsRef = ref(database, `/userRuns`);

// guid = globally unique identifier
let guid = localStorage.getItem("guid");
let userRunsRef;

if (guid) {
  userRunsRef = child(allUserRunsRef, guid);
} else {
  userRunsRef = push(allUserRunsRef);
  localStorage.setItem("guid", userRunsRef.key);
}

function AppRouter() {
  const router = createBrowserRouter([
    {
      path: "*",
      element: <App />,
    },
  ]);

  return <RouterProvider {...{ router }} />;
}

function App() {
  const [{ sunrise, sunset, duration, selectedTime }, setTimes] = useState({});
  const [theme, setTheme] = useState("sunrise")

  const handleTheme = () => {
    setTheme((theme) => (theme === "sunrise" ? "sunset" : "sunrise"))
  }

  const location = useLocation();
  const isResultsPage = location.pathname === "/results";

  const handleStuff = (times) => {
    // handleStuff gets an object containing any combination of sunrise / sunset / duration
    // The new state is made from the old state plus whatever is in `times`
    setTimes({ sunrise, sunset, duration, selectedTime, ...times });
  };

  return (
  <div
      className={`${isResultsPage ? "resultsBackground" : "mainBackground"} ${theme === "sunset" ? "sunsetTheme" : ""}`}
    >
    <div className="wrapper">
      <Header />
    <label className="themeToggleSwitch">
      <input
        type="checkbox"
        className="themeToggleInput"
        checked={theme === "sunset"}
        onChange={handleTheme}
      />
      <span className="themeToggleSlider"></span>
    </label>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Form {...{ handleStuff }} /> <Popup />
            </>
          }
        />
        <Route
          path="/results"
          element={
            <Results {...{ sunrise, sunset, duration, selectedTime }} />
          }
        />
      </Routes>
      <Footer />
    </div>
  </div>
  );
}

export default AppRouter;
