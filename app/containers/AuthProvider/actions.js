/*
 * AuthProvider Actions
 */

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILURE,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  CLEAR_AUTH_ERROR,
  SET_USER,
  CLEAR_USER,
} from './constants';

// Login actions
export function loginRequest(credentials) {
  return {
    type: LOGIN_REQUEST,
    payload: credentials,
  };
}

export function loginSuccess(user, tokens) {
  return {
    type: LOGIN_SUCCESS,
    payload: { user, tokens },
  };
}

export function loginFailure(error) {
  return {
    type: LOGIN_FAILURE,
    payload: error,
  };
}

// Register actions
export function registerRequest(userData) {
  return {
    type: REGISTER_REQUEST,
    payload: userData,
  };
}

export function registerSuccess(user, tokens) {
  return {
    type: REGISTER_SUCCESS,
    payload: { user, tokens },
  };
}

export function registerFailure(error) {
  return {
    type: REGISTER_FAILURE,
    payload: error,
  };
}

// Logout actions
export function logoutRequest() {
  return {
    type: LOGOUT_REQUEST,
  };
}

export function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function logoutFailure(error) {
  return {
    type: LOGOUT_FAILURE,
    payload: error,
  };
}

// Refresh token actions
export function refreshTokenRequest() {
  return {
    type: REFRESH_TOKEN_REQUEST,
  };
}

export function refreshTokenSuccess(tokens) {
  return {
    type: REFRESH_TOKEN_SUCCESS,
    payload: tokens,
  };
}

export function refreshTokenFailure(error) {
  return {
    type: REFRESH_TOKEN_FAILURE,
    payload: error,
  };
}

// Get user actions
export function getUserRequest() {
  return {
    type: GET_USER_REQUEST,
  };
}

export function getUserSuccess(user) {
  return {
    type: GET_USER_SUCCESS,
    payload: user,
  };
}

export function getUserFailure(error) {
  return {
    type: GET_USER_FAILURE,
    payload: error,
  };
}

// Utility actions
export function clearAuthError() {
  return {
    type: CLEAR_AUTH_ERROR,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user,
  };
}

export function clearUser() {
  return {
    type: CLEAR_USER,
  };
}
