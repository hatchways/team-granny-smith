import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import AddNewItem from '../../components/AddNewItem/AddNewItem';
import ShoppingLists from '../../components/ShoppingLists/ShoppingLists';
import { useAuth } from '../../context/useAuthContext';
import { useSocket } from '../../context/useSocketContext';
import { useEffect, useState } from 'react';
import { CircularProgress } from '@material-ui/core';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  const { loggedInUser } = useAuth();
  const { initSocket } = useSocket();

  const [lists] = useState(['Clothes', 'Furniture', 'Luxury']);

  useEffect(() => {
    initSocket();
  }, [initSocket]);

  if (!loggedInUser) {
    // loading for a split seconds until redirected to login page
    return <CircularProgress />;
  }

  return (
    <Grid container component="main" justify="center" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <DashboardHeader />
      <AddNewItem lists={lists} />
      <ShoppingLists />
    </Grid>
  );
}
