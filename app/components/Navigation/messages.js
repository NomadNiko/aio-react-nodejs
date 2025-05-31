/*
 * Navigation Messages
 *
 * This contains all the text for the Navigation component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.components.Navigation';

export default defineMessages({
  companyName: {
    id: `${scope}.companyName`,
    defaultMessage: 'Business Solutions',
  },
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  services: {
    id: `${scope}.services`,
    defaultMessage: 'Services',
  },
  results: {
    id: `${scope}.results`,
    defaultMessage: 'Results',
  },
  contact: {
    id: `${scope}.contact`,
    defaultMessage: 'Contact',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  register: {
    id: `${scope}.register`,
    defaultMessage: 'Register',
  },
  logout: {
    id: `${scope}.logout`,
    defaultMessage: 'Logout',
  },
  welcome: {
    id: `${scope}.welcome`,
    defaultMessage: 'Welcome,',
  },
  adminUsers: {
    id: `${scope}.adminUsers`,
    defaultMessage: 'Manage Users',
  },
});
