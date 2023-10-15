import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    setUser(currentUser);
    setLoading(false); 
  }, []);

  useEffect(() => {
    if (!loading && user) {
      const refreshTimeout = setTimeout(() => {
        window.location.reload(); 
      }, 7000);

      return () => clearTimeout(refreshTimeout); // Clear the timeout when the component unmounts
    }
  }, [loading, user]);

  if (loading) {
    return (
      <div className="container">
        <h3>Loading user data...</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container">
        <h3>User data not available. Please log in.</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <header className="jumbotron">
        <h3>
          <strong>{user.user.username}</strong> Profile
        </h3>
      </header>
      <p>
        <strong>Id:</strong> {user.user._id}
      </p>
      <p>
        <strong>Email:</strong> {user.user.email}
      </p>
      <strong>Username:</strong>
      <ul>{user.user.username}</ul>
    </div>
  );
};

export default Profile;
