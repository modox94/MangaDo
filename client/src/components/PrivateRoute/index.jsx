import React from 'react';
import { useSelector } from 'react-redux';
import { Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const user = useSelector((store) => store.user.name);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/signIn', state: { from: location } }} />
        )
      }
    />
  );
};

export default PrivateRoute;
