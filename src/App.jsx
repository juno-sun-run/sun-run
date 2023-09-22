import { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Routes, Route, Link } from "react-router-dom";
import "../styles/App.css";
import "react-widgets/styles.css";
import Header from "./components/Header";
import Form from "./components/Form";
import Results from "./components/Results";
import Footer from "./components/Footer";
import formatTime from "./helpers/formatTime";
import getUserTimezoneDate from "./helpers/getUserTimezoneDate";
import { useAccessors } from "react-widgets/cjs/Accessors";

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

  const handleShit = (times) => {
    // handleShit gets an object containing any combination of sunrise / sunset / duration
    // The new state is made from the old state plus whatever is in `times`
    setTimes({ sunrise, sunset, duration, selectedTime, ...times })
  };

  return (
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
  );
}

export default AppRouter;
