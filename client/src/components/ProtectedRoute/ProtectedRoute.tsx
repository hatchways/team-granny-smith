import { Box, CircularProgress } from '@material-ui/core';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

interface PrivateRouteProps extends RouteProps {
  // eslint-disable-next-line
  component: any;
}

//Protected route  component to wrap pages that require users to be logged in beforehand.
//Redirects to login page is user=false
const ProtectedRoute = (props: PrivateRouteProps): JSX.Element => {
  const { component: Component, ...rest } = props;
  const { loggedInUser, isLoading } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return (
            <Box display="flex" width="100%" height="100vh" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          );
        } else {
          if (loggedInUser) {
            return <Component {...rest} {...props} />;
          } else {
            return (
              <Redirect
                to={{
                  pathname: '/login',
                  state: {
                    from: props.location,
                  },
                }}
              />
            );
          }
        }
      }}
    />
  );
};

export default ProtectedRoute;
