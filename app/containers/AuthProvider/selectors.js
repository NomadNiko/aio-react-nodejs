/*
 * AuthProvider Selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAuth = state => state.auth || initialState;

const makeSelectUser = () =>
  createSelector(
    selectAuth,
    authState => authState.user,
  );

const makeSelectTokens = () =>
  createSelector(
    selectAuth,
    authState => authState.tokens,
  );

const makeSelectLoading = () =>
  createSelector(
    selectAuth,
    authState => authState.loading,
  );

const makeSelectError = () =>
  createSelector(
    selectAuth,
    authState => authState.error,
  );

const makeSelectIsAuthenticated = () =>
  createSelector(
    selectAuth,
    authState => authState.isAuthenticated,
  );

const makeSelectIsInitialized = () =>
  createSelector(
    selectAuth,
    authState => authState.isInitialized,
  );

const makeSelectIsAdmin = () =>
  createSelector(
    selectAuth,
    authState => authState.user && authState.user.role === 'admin',
  );

const makeSelectUserRole = () =>
  createSelector(
    selectAuth,
    authState => (authState.user ? authState.user.role : null),
  );

export {
  selectAuth,
  makeSelectUser,
  makeSelectTokens,
  makeSelectLoading,
  makeSelectError,
  makeSelectIsAuthenticated,
  makeSelectIsInitialized,
  makeSelectIsAdmin,
  makeSelectUserRole,
};
