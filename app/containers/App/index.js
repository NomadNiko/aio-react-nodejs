/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled from 'styled-components';

import HomePage from 'containers/HomePage/Loadable';
import ServicesPage from 'containers/ServicesPage/Loadable';
import ResultsPage from 'containers/ResultsPage/Loadable';
import ContactPage from 'containers/ContactPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import RegisterPage from 'containers/RegisterPage/Loadable';
import AdminUsersPage from 'containers/AdminUsersPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Navigation from 'components/Navigation/Loadable';
import ProtectedRoute from 'components/ProtectedRoute';
import AuthProvider from 'containers/AuthProvider';

import GlobalStyle from '../../global-styles';

const AppWrapper = styled.div`
  min-height: 100vh;
  background-color: #f8f9fa;
`;

const MainContent = styled.main`
  padding-top: 70px; // Account for fixed navigation
`;

export default function App() {
  return (
    <AuthProvider>
      <AppWrapper>
        <Navigation />
        <MainContent>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/services" component={ServicesPage} />
            <Route path="/results" component={ResultsPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <ProtectedRoute path="/admin/users" adminOnly>
              <AdminUsersPage />
            </ProtectedRoute>
            <Route component={NotFoundPage} />
          </Switch>
        </MainContent>
        <GlobalStyle />
      </AppWrapper>
    </AuthProvider>
  );
}
