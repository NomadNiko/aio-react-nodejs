/*
 * AuthProvider Reducer
 */
import produce from 'immer';
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

// Initial state
export const initialState = {
  user: null,
  tokens: null,
  loading: false,
  error: null,
  isAuthenticated: false,
  isInitialized: false,
};

/* eslint-disable default-case, no-param-reassign */
const authProviderReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOGIN_REQUEST:
      case REGISTER_REQUEST:
      case REFRESH_TOKEN_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;

      case GET_USER_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isInitialized = false;
        break;

      case LOGIN_SUCCESS:
      case REGISTER_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.user = action.payload.user;
        draft.tokens = action.payload.tokens;
        draft.isAuthenticated = true;
        draft.isInitialized = true;
        break;

      case REFRESH_TOKEN_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.tokens = action.payload;
        break;

      case GET_USER_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.user = action.payload;
        draft.isAuthenticated = true;
        draft.isInitialized = true;
        break;

      case LOGIN_FAILURE:
      case REGISTER_FAILURE:
      case REFRESH_TOKEN_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        draft.user = null;
        draft.tokens = null;
        draft.isAuthenticated = false;
        draft.isInitialized = true;
        break;

      case GET_USER_FAILURE:
        draft.loading = false;
        draft.error = action.payload;
        draft.user = null;
        draft.tokens = null;
        draft.isAuthenticated = false;
        draft.isInitialized = true;
        break;

      case LOGOUT_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;

      case LOGOUT_SUCCESS:
      case LOGOUT_FAILURE:
        draft.loading = false;
        draft.error = action.type === LOGOUT_FAILURE ? action.payload : null;
        draft.user = null;
        draft.tokens = null;
        draft.isAuthenticated = false;
        draft.isInitialized = true;
        break;

      case CLEAR_AUTH_ERROR:
        draft.error = null;
        break;

      case SET_USER:
        draft.user = action.payload;
        draft.isAuthenticated = !!action.payload;
        draft.isInitialized = true;
        break;

      case CLEAR_USER:
        draft.user = null;
        draft.tokens = null;
        draft.isAuthenticated = false;
        draft.isInitialized = true;
        break;
    }
  });

export default authProviderReducer;
