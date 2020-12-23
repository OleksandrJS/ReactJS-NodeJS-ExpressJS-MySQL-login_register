/** @format */

import { createContext } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './hooks/auth.hook';
import { Routes } from './routes';

export const AuthContext = createContext();

function App() {
  const { login, logout, username, userEmail, token } = useAuth();
  const isAuthenticated = !!token;
  const routes = Routes(isAuthenticated);

  return (
    <div className="form-wrapper">
      <AuthContext.Provider
        value={{
          login,
          logout,
          username,
          userEmail,
        }}>
        <Router>{routes}</Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;
