import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../containers/AuthProvider';

export default function ProtectedRoute({
  children,
  adminOnly = false,
  ...rest
}) {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          );
        }

        if (adminOnly && !isAdmin) {
          return (
            <Redirect
              to={{
                pathname: '/',
                state: { error: 'Access denied. Admin privileges required.' },
              }}
            />
          );
        }

        return children;
      }}
    />
  );
}
