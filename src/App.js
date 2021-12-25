import "./App.css";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData, getWeatherData } from "./api";

import "leaflet/dist/leaflet.css";

const App = () => {
  const [places, setPlaces] = useState([]);
  // console.log("!!!places", places);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  const [weatherData, setWeatherData] = useState([]);
  console.log("weatherdata", weatherData);

  const [coordinates, setCoordinates] = useState({});
  // console.log("cords", coordinates);

  const [bounds, setBounds] = useState({});

  const [event, setEvent] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    if (bounds.sw && bounds.ne) {
      setIsLoading(true);

      getWeatherData(coordinates.lat, coordinates.lng).then((data) =>
        setWeatherData(data)
      );

      getPlacesData(type, bounds.sw, bounds.ne).then((placeData) => {
        // console.log(">>>>>>", placeData);

        const newData = placeData?.filter((item) => {
          return (
            item.name && item.latitude && item.longitude && item.num_reviews > 0
          );
        });

        // console.log(";;;;;;;;;;;;;;;;;;", newData);

        const filterData = newData?.map((item, i) => {
          parseFloat(item.latitude);
          parseFloat(item.longitude);
          const index = i;
          return { ...item, index };
        });
        console.log("filterData", filterData);

        setPlaces(filterData);
        setFilteredPlaces([]);
        setIsLoading(false);
      });
    }
  }, [type, bounds]);

  useEffect(() => {
    const filteredPlaces = places.filter((place) => place?.rating > rating);
    setFilteredPlaces(filteredPlaces);
  }, [rating]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List
            places={filteredPlaces.length ? filteredPlaces : places}
            event={event}
            isLoading={isLoading}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={filteredPlaces.length ? filteredPlaces : places}
            setEvent={setEvent}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
