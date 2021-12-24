import "./App.css";
import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@material-ui/core";

import Header from "./components/Header/Header";
import List from "./components/List/List";
import Map from "./components/Map/Map";
import { getPlacesData } from "./api";

import "leaflet/dist/leaflet.css";

const App = () => {
  const [places, setPlaces] = useState([]);
  // console.log("!!!places", places);

  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [event, setEvent] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCoordinates({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  useEffect(() => {
    setIsLoading(true);
    getPlacesData(bounds.sw, bounds.ne).then((placeData) => {
      // console.log(">>>>>>", placeData);

      const newData = placeData?.filter((item) => {
        return item.name && item.latitude && item.longitude;
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
      setIsLoading(false);
    });
  }, [bounds]);

  return (
    <>
      <CssBaseline />
      <Header />
      <Grid container spacing={3} style={{ width: "100%" }}>
        <Grid item xs={12} md={4}>
          <List places={places} event={event} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            coordinates={coordinates}
            places={places}
            setEvent={setEvent}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default App;
