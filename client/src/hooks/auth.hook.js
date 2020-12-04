/** @format */

import { useState, useCallback, useEffect } from 'react';

const storageName = 'userdata';

export const useAuth = () => {
  const [username, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = useCallback((name, email) => {
    setIsAuthenticated(true);
    setUserName(name);
    setUserEmail(email);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        username: name,
        userEmail: email,
        isAuthenticated: true,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserName(null);
    setUserEmail(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data) {
      setIsAuthenticated(data.isAuthenticated);
      setUserName(data.username);
      setUserEmail(data.userEmail);
    }
  }, [login]);

  return { login, logout, isAuthenticated, username, userEmail };
};
