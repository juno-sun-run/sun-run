import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Routes, Route, Link, useLocation } from "react-router-dom";
import "../styles/App.css";
import "react-widgets/styles.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Results from "./components/Results";
import Footer from "./components/Footer";
import formatTime from "./helpers/formatTime";
import getUserTimezoneDate from "./helpers/getUserTimezoneDate";
import { useAccessors } from "react-widgets/cjs/Accessors";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD_tBx3qX1mmQzbKhq0dZondFz4HTMjQK0",
  authDomain: "sun-run-feb5f.firebaseapp.com",
  projectId: "sun-run-feb5f",
  storageBucket: "sun-run-feb5f.appspot.com",
  messagingSenderId: "383995255223",
  appId: "1:383995255223:web:7879e1bbb6889e9f7ff032"
};

const app = initializeApp(firebaseConfig);

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
  const [{ sunrise, sunset, duration, selectedTime }, setTimes] = useState({})

  const location = useLocation();
  const isResultsPage = location.pathname === "/results";

  const handleShit = (times) => {
    // handleShit gets an object containing any combination of sunrise / sunset / duration
    // The new state is made from the old state plus whatever is in `times`
    setTimes({ sunrise, sunset, duration, selectedTime, ...times })
  };

  return (
    <div className={`${isResultsPage ? "resultsBackground" : "mainBackground"}`}>
    <div className="wrapper">
      <Header />
      
      <Routes>
        <Route path="/" element={
          <Form {...{ handleShit }} />
        } />
        <Route path="/results" element={
          <Results {...{ sunrise, sunset, duration, selectedTime }} />
        } />
      </Routes>
      <Footer />
    </div>
    </div>
  );
}

export default AppRouter;
