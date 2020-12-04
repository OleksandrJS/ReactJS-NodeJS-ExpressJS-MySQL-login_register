/** @format */

import { NavLink } from 'react-router-dom';

export const AuthLinks = () => {
  return (
    <div className="auth-links">
      <NavLink activeClassName="is-active" to="/" exact>
        Sign Up
      </NavLink>
      <NavLink activeClassName="is-active" to="/signIn">
        Sign In
      </NavLink>
    </div>
  );
};
