import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  paper: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: "100px",
  },
  mapContainer: {
    height: "85vh",
    width: "100%",
  },
  map: {
    height: "500px",
    backgroundColor: "white",
    padding: "1rem",
    borderRadius: "20px",
    marginTop: "16px",
    boxShadow: "0 0 8px -4px rgba(0, 0, 0, 0.5)",
  },
  markerContainer: {
    position: "absolute",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
    "&:hover": { zIndex: 2000 },
  },
  pointer: {
    cursor: "pointer",
  },
  image:{
    
  }
}));
