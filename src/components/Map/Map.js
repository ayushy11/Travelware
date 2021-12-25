import React, { useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMapEvents,
  Circle,
} from "react-leaflet";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";

import useStyles from "./styles.js";

function LocationMarker({ setCoordinates, setBounds }) {
  const [position, setPosition] = useState(null);
  const map = useMapEvents({
    click() {
      map.locate();
    },
    locationfound(e) {
      // console.log("/////", e);
      setCoordinates({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
      setBounds({
        ne: e.bounds._northEast,
        sw: e.bounds._southWest,
      });
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Tooltip>You are here</Tooltip>
    </Marker>
  );
}

const Map = ({
  setBounds,
  setCoordinates,
  coordinates,
  places,
  setEvent,
  weatherData,
}) => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width: 600px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  const showDataOnMap = (places) =>
    places?.map((place) => (
      <Circle
        center={[place.latitude, place.longitude]}
        fillOpacity={1}
        pathOptions={{
          color: "#797EF6",
          fillColor: "#4ADEDE",
        }}
        radius={16}
        eventHandlers={{
          click: (e) => {
            console.log("circle clicked", e);
            const locationId = parseFloat(place.index);
            setEvent(locationId);
          },
        }}
      >
        <Popup className={classes.markerContainer}>
          <Paper elevation={3} className={classes.paper}>
            <Typography
              variant="subtitle2"
              gutterbottom
              className={classes.typography}
            >
              {place?.name}
            </Typography>
            <img
              src={
                place?.photo
                  ? place?.photo.images.large.url
                  : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
              }
              className={classes.pointer}
              alt={place.name}
            />
            <Rating size="small" value={place?.rating} readOnly />
          </Paper>
        </Popup>
      </Circle>
    ));

  return (
    <div className={classes.mapContainer}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={16}
        scrollWheelZoom={false}
        className={classes.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker setBounds={setBounds} setCoordinates={setCoordinates} />
        <div className={classes.markerContainer}>{showDataOnMap(places)}</div>
        {/* <div className={classes.markerContainer}>
          {weatherData?.list?.map((data, i) => (
            <div key={i} lat={data.coord.lat} lng={data.coord.lon}>
              <img
                height={50}
                src={`https://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              />
            </div>
          ))}
        </div> */}
      </MapContainer>
    </div>
  );
};

export default Map;
