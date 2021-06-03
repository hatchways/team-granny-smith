import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import AddNewItem from '../../components/AddNewItem/AddNewItem';
import ShoppingLists from '../../components/ShoppingLists/ShoppingLists';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/useAuthContext';
import { CircularProgress } from '@material-ui/core';
import getUserLists from '../../helpers/APICalls/getUserLists';
import { useSnackBar } from '../../context/useSnackbarContext';
import { ListInterface } from '../../interface/List';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();
  const { loggedInUser } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const [lists, setLists] = useState<ListInterface[]>([]);

  if (!loggedInUser) {
    // loading for a split seconds until redirected to login page
    return (
      <Grid container component="main" justify="center" alignItems="center" style={{ width: '100vw', height: '100vh' }}>
        <CircularProgress />
      </Grid>
    );
  }

  useEffect(() => {
    getUserLists()
      .then((response) => {
        setLists(response.data);
      })
      .catch(() => {
        updateSnackBarMessage('There was a problem fetching your lists');
      });
  }, []);

  return (
    <Grid container component="main" justify="center" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <DashboardHeader />
      <AddNewItem lists={lists} />
      <ShoppingLists userId={loggedInUser.id} lists={lists} setLists={setLists} />
    </Grid>
  );
}
