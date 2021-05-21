import { Box, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

import LogoPic from '../../Images/logoPic.png';
import userImage from '../../Images/userImage1.png';

import { User } from '../../interface/User'; //temp
import { useAuth } from '../../context/useAuthContext';

export default function DashboardHeader(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();

  return (
    <Grid container item xs={12} direction="row" justify="center" alignItems="center" className={classes.navBar}>
      <Box flexGrow={1}>
        <Link to="/">
          <img src={LogoPic} alt="Logo" className={classes.logo} />
        </Link>
      </Box>
      <Grid item>
        <Button className={`${classes.navBarItem} ${classes.navbarItemActive}`} component={Link} to={'/dashboard'}>
          Shopping Lists
        </Button>
        <Button className={classes.navBarItem} component={Link} to={'/dashboard/friends'}>
          Friends
        </Button>
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
        <Grid item>{loggedInUser?.username}</Grid>
      </Grid>
    </Grid>
  );
}
