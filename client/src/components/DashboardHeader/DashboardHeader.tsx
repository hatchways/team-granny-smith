import React from 'react';
import { Box, Button, Grid, Popover } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from './useStyles';

import { useAuth } from '../../context/useAuthContext';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import LogoPic from '../../Images/logoPic.png';
import userImage from '../../Images/userImage1.png';

export default function DashboardHeader(): JSX.Element {
  const classes = useStyles();

  const loggedInUser = useAuth().loggedInUser;

  if (loggedInUser === undefined || !loggedInUser) return <CircularProgress />;

  const { logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const popoverOpen = Boolean(anchorEl);

  const handleLogout = () => {
    handleClose();
    logout();
  };

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
        className={classes.profileWrapper}
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Button onClick={handleClick} className={classes.profileButton}>
          <Grid item xs={12} sm={6}>
            <img src={userImage} alt="Profile Picture" className={classes.profilePicture} />
          </Grid>
          <Grid item xs={12} sm={6}>
            {loggedInUser.username}
          </Grid>
        </Button>
        <Popover
          id="user-popover"
          open={popoverOpen}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <List dense={true}>
            <ListItem button>
              <ListItemIcon>
                <AddPhotoAlternateIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Change Profile Photo" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <ExitToAppIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary="Logout" onClick={handleLogout} />
            </ListItem>
          </List>
        </Popover>
      </Grid>
    </Grid>
  );
}
