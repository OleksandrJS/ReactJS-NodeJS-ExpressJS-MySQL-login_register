/** @format */
import { AuthContext } from '../App';
import { useContext } from 'react';

const UserPage = () => {
  const { logout, username, userEmail } = useContext(AuthContext);

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <h5>email: {userEmail}</h5>
      <button className="btn" onClick={logout}>
        Log out
      </button>
    </div>
  );
};

export default UserPage;
