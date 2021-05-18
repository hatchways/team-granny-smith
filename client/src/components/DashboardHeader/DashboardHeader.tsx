import { Box, Button, Grid } from '@material-ui/core';
import * as React from 'react';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

import LogoPic from '../../Images/logoPic.png';
import userImage from '../../Images/userImage1.png';

import { User } from '../../interface/User'; //temp

export default function DashboardHeader(): JSX.Element {
  const classes = useStyles();

  const loggedInUser: User = { email: 'rose@gmail.com', username: 'Rose' }; //temp

  return (
    <Grid container item xs={12} direction="row" justify="center" alignItems="center" className={classes.navBar}>
      <Box flexGrow={1}>
        <Link to="/">
          <img src={LogoPic} alt="Logo" className={classes.logo} />
        </Link>
      </Box>
      <Grid item>
        <Button className={classes.navBarItem}>Shopping Lists</Button>
        <Button className={classes.navBarItem}>Friends</Button>
        <Button className={classes.navBarItem}>Notifications</Button>
      </Grid>
      <Grid
        item
        container
        direction="row"
        className={classes.profileWrapper}
        justify="center"
        alignItems="center"
        spacing={2}
      >
        <Grid item>
          <img src={userImage} alt="Profile Picture" className={classes.profilePicture} />
        </Grid>
        <Grid item>{loggedInUser.username}</Grid>
      </Grid>
    </Grid>
  );
}
