import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Rating } from "@material-ui/lab";

import useStyles from "./styles.js";

const Map = () => {
  const classes = useStyles();
  const isMobile = useMediaQuery("(min-width: 600px)");
  const isDesktop = useMediaQuery("(min-width: 1440px)");

  return (
    <div className={classes.mapContainer}>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        scrollWheelZoom={false}
        className={classes.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
      {/* <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyAwCYDXqraqHicaQr9ltaSN91JQYOe6cJU" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(e) => {
          console.log("!!!", e);
          setCoordinates({
            lat: e.center.lat,
            lng: e.center.lng,
          });
          setBounds({
            ne: e.marginBounds.ne,
            sw: e.marginBounds.sw,
          });
        }}
        onChildClick={""}
      >
        {places?.map((place, i) => (
          <div
            className={classes.markerContainer}
            lat={place.latitude}
            lng={place.longitude}
            key={i}
          >
            {isDesktop ? (
              <LocationOnOutlinedIcon color="primary" fontSize="large" />
            ) : (
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
            )}
          </div>
        ))}
      </GoogleMapReact> */}
    </div>
  );
};

export default Map;
