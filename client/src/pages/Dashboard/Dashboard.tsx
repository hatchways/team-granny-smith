import Grid from '@material-ui/core/Grid';
import CssBaseline from '@material-ui/core/CssBaseline';
import useStyles from './useStyles';
import DashboardHeader from '../../components/DashboardHeader/DashboardHeader';
import AddNewItem from '../../components/AddNewItem/AddNewItem';
import ShoppingLists from '../../components/ShoppingLists/ShoppingLists';

export default function Dashboard(): JSX.Element {
  const classes = useStyles();

  return (
    <Grid container component="main" justify="center" className={`${classes.root} ${classes.dashboard}`}>
      <CssBaseline />
      <DashboardHeader />
      <AddNewItem />
      <ShoppingLists />
    </Grid>
  );
}
