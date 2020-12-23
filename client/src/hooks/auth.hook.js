/** @format */

import { useState, useCallback, useEffect } from 'react';

const storageName = 'userdata';

export const useAuth = () => {
  const [username, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [token, setToken] = useState(false);

  const login = useCallback((name, email, jwtToken) => {
    setToken(jwtToken);
    setUserName(name);
    setUserEmail(email);

    localStorage.setItem(
      storageName,
      JSON.stringify({
        username: name,
        userEmail: email,
        token: jwtToken,
      }),
    );
  }, []);

  const logout = useCallback(() => {
    setToken(false);
    setUserName(null);
    setUserEmail(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      login(data.username, data.userEmail, data.token);
      // setToken(data.token);
      // setUserName(data.username);
      // setUserEmail(data.userEmail);
    }
  }, [login]);

  return { login, logout, token, username, userEmail };
};
