import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
//import Main from "./components/Main";
//import DateSelector from "./components/DateSelector";
import ImageGallery from "./components/ImageGallery";

const today = new Date();
const todayDate = today.toISOString().slice(0, 10);
function App() {
  const [astronomyData, setAstronomyData] = useState(null);
  const [selectedDate, setSelectedDate] = useState(todayDate);

  const [selectedAPOD, setSelectedAPOD] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=wxjsshrWCjxAq3V7mvYqIUtofKeQ3RoA9aR9gHes&count=3"
      )
      .then(function (response) {
        console.log(response);
        setAstronomyData(response.data);
        setSelectedAPOD(response.data[2]);
        setError(null);
      })
      .catch(function (error) {
        console.log(error);
        setError(error.response.data.msg);
      });
  }, [selectedDate]);

  const galleryClickHandler = (ind) => {
    setSelectedAPOD(astronomyData[ind]);
  };
  if (!selectedAPOD) return <h3>Yükleniyor...</h3>;

  const containerBg = selectedAPOD
    ? { backgroundImage: `url(${selectedAPOD.url})` }
    : {};

  return (
    <div className="App flex-center" style={containerBg}>
      <div className="container">
        <div className="column flex-center">
          <div className="hamburger-menu"></div>
        </div>
        <div className="column">
          <div className="row title-container">
            <div className="row apod-title">{selectedAPOD.title}</div>
            <div className="row line">
              <hr />
            </div>
            <div className="row apod-date">{selectedAPOD.date}</div>
          </div>
          <div className="row grow flex-center apod-text">APOD</div>
          <div className="row">Copyright</div>
        </div>
        <div className="column grow">
          <div className="row"></div>
          <div className="row grow  fancy-title-container">
            <div className="fancy-title title">{selectedAPOD.title}</div>
            <div className="fancy-title watch">WATCH</div>
          </div>
          <div className="row direction">
            <div className="row prev-next">Prev</div>
            <div className="row prev-next">Next</div>
          </div>
        </div>
        <div className="column">
          <ImageGallery
            clickProp={galleryClickHandler}
            astronomyData={astronomyData}
            selectedAPOD={selectedAPOD}
          />
        </div>
        <div className="column">
          <div className="row">archive</div>
          <div className="row grow social">
            <span>facebook</span>
            <span>twitter</span>
            <span>instagram</span>
          </div>
        </div>
      </div>
      {/* <DateSelector
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      {error && <h3>Error:{error}</h3>}
      {!error && <ImageGallery astronomyData={astronomyData} />} */}
    </div>
  );
}
export default App;
