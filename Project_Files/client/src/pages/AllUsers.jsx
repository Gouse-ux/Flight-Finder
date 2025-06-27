import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/allUsers.css';
import axios from 'axios';

const AllUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-users');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  return (
    <>
      <Navbar />
      <div className="all-users-page">
        <h2>All Customers</h2>
        <div className="all-users">
          {users
            .filter((user) => user.usertype === 'customer')
            .map((user) => (
              <div className="user-card" key={user._id}>
                <p><b>User ID:</b> {user._id}</p>
                <p><b>Username:</b> {user.username}</p>
                <p><b>Email:</b> {user.email}</p>
              </div>
            ))}
        </div>

        <h2>Flight Operators</h2>
        <div className="all-users">
          {users
            .filter((user) => user.usertype === 'flight-operator')
            .map((user) => (
              <div className="user-card" key={user._id}>
                <p><b>Operator ID:</b> {user._id}</p>
                <p><b>Flight Name:</b> {user.username}</p>
                <p><b>Email:</b> {user.email}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default AllUsers;