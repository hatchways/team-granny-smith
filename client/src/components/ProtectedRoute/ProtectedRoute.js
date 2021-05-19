import { CircularProgress } from '@material-ui/core';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/useAuthContext';

//Protected route  component to wrap pages that require users to be logged in beforehand.
//Redirects to login page is user=false
const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { loggedInUser, isLoading } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isLoading) {
          return <CircularProgress />;
        } else {
          console.log(loggedInUser);
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
