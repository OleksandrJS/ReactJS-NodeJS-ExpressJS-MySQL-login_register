/** @format */

import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import SignInPage from './pages/SignInPage';
import UserPage from './pages/UserPage';

export const Routes = (isAuthenticated) => {
  if (isAuthenticated) {
    return (
      <Switch>
        <Route path="/user" exact>
          <UserPage />
        </Route>
        <Redirect to="/user" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Route path="/signin">
        <SignInPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
