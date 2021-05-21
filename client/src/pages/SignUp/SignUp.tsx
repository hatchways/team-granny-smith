import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import register from '../../helpers/APICalls/register';
import SignUpForm from './SignUpForm/SignUpForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import Dialog from '@material-ui/core/Dialog';
import { addList } from '../../helpers/APICalls/list';

export default function Register(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const handleSubmit = (
    { username, email, password }: { email: string; password: string; username: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string; username: string }>,
  ) => {
    register(username, email, password).then((data) => {
      if (data.error) {
        console.error({ error: data.error.message });
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
        const shoppingUrl = 'https://team-granny-smith-s3.s3.ca-central-1.amazonaws.com/default-images/Shopping.jpg';
        const wishlistUrl = 'https://team-granny-smith-s3.s3.ca-central-1.amazonaws.com/default-images/Wishlist.jpg';
        const userId = data.success.user.id;
        console.log(userId);
        addList('Shopping', shoppingUrl, userId);
        addList('Wishlist', wishlistUrl, userId);
      } else {
        // should not get here from backend but this catch is for an unknown issue
        console.error({ data });

        setSubmitting(false);
        updateSnackBarMessage('An unexpected error occurred. Please try again');
      }
    });
  };

  return (
    <Dialog open fullWidth maxWidth="sm">
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={12} sm={12} md={12} lg={12} elevation={6} component={Paper} square>
          <Box className={classes.authWrapper}>
            <Box className={classes.box1}>
              <Grid container>
                <Grid item xs>
                  <Typography className={classes.welcome} component="h1" variant="h5">
                    Create an account
                  </Typography>
                </Grid>
              </Grid>
              <SignUpForm handleSubmit={handleSubmit} />
            </Box>
            <AuthHeader linkTo="/login" asideText="Already have an account?" linkText="Login" />
            <Box p={1} alignSelf="center" />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}
