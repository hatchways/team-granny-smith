import { Route, Redirect } from 'react-router-dom';

//Protected route component to wrap pages that require users to be logged in beforehand.
//Redirects to login page is user=false
const ProtectedRoute = ({ component: Component, loggedInUser, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
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
      }}
    />
  );
};

export default ProtectedRoute;
