import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import DateSelector from "./components/DateSelector";
import Main from "./components/Main";

const today = new Date();
const todayDate = today.toISOString().slice(0, 10);
function App() {
  const [astronomyData, SetAstronomyData] = useState("");
  const [selectedDate, setSelectedDate] = useState(todayDate);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=wxjsshrWCjxAq3V7mvYqIUtofKeQ3RoA9aR9gHes&date=" +
          selectedDate
      )
      .then(function (response) {
        SetAstronomyData(response.data);
        setError(null);
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data.msg);
      });
  }, [selectedDate]);

  return (
    <div className="App">
      <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {error && <h3>Error:{error}</h3>}
      {!error && <Main astronomyData={astronomyData} />}
    </div>
  );
}

export default App;
