import React from "react";
import { AppBar, Toolbar, Typography, InputBase, Box } from "@material-ui/core";
import travelware from "../../images/travelware.png";

import useStyles from "./styles.js";

const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="static">
      <Toolbar className={classes.toolbar}>
        {/* <Typography variant="h5" className={classes.title}>
          Travelware
        </Typography> */}
        <img src={travelware} alt="travelware" className={classes.title} />
        <Box display="flex">
          <Typography variant="h6" className={classes.subtitle}>
            Explore new places
          </Typography>
          {/* <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{ root: classes.inputRoot, input: classes.inputInput }}
            />
          </div> */}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
