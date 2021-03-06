import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import { FormikHelpers } from 'formik';
import Typography from '@material-ui/core/Typography';
import useStyles from './useStyles';
import login from '../../helpers/APICalls/login';
import LoginForm from './LoginForm/LoginForm';
import AuthHeader from '../../components/AuthHeader/AuthHeader';
import { useAuth } from '../../context/useAuthContext';
import { useSnackBar } from '../../context/useSnackbarContext';
import Dialog from '@material-ui/core/Dialog';
import { useSocket } from '../../context/useSocketContext';
import { useEffect } from 'react';

export default function Login(): JSX.Element {
  const classes = useStyles();
  const { updateLoginContext } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();
  const { initSocket } = useSocket();

  useEffect(() => {
    initSocket();
  }, []);

  const handleSubmit = (
    { email, password }: { email: string; password: string },
    { setSubmitting }: FormikHelpers<{ email: string; password: string }>,
  ) => {
    login(email, password).then((data) => {
      if (data.error) {
        setSubmitting(false);
        updateSnackBarMessage(data.error.message);
      } else if (data.success) {
        updateLoginContext(data.success);
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
                    Login
                  </Typography>
                </Grid>
              </Grid>
              <LoginForm handleSubmit={handleSubmit} />
            </Box>
            <AuthHeader linkTo="/signup" asideText="Don't have an account?" linkText="Create an account" />
          </Box>
        </Grid>
      </Grid>
    </Dialog>
  );
}
