import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/FlightAdmin.css';
import { useNavigate } from 'react-router-dom';

const FlightAdmin = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState();
  const [bookingCount, setBookingCount] = useState(0);
  const [flightsCount, setFlightsCount] = useState(0);

  useEffect(() => {
    fetchUserData();
    fetchStats();
  }, []);

  const fetchUserData = async () => {
    try {
      const id = localStorage.getItem('userId');
      const response = await axios.get("http://localhost:6001/fetch-user/${id}");
      setUserDetails(response.data);
    } catch (err) {
      console.error('Error fetching user data:', err);
    }
  };

  const fetchStats = async () => {
    try {
      const username = localStorage.getItem('username');

      const bookingsRes = await axios.get('http://localhost:6001/fetch-bookings');
      const flightsRes = await axios.get('http://localhost:6001/fetch-flights');

      const bookingList = bookingsRes.data.filter(
        (booking) => booking.flightName === username
      );
      const flightList = flightsRes.data.filter(
        (flight) => flight.flightName === username
      );

      setBookingCount(bookingList.length);
      setFlightsCount(flightList.length);
    } catch (err) {
      console.error('Error fetching statistics:', err);
    }
  };

  return (
    <div className="flightAdmin-page">
      {userDetails ? (
        <>
          {userDetails.approval === 'not-approved' && (
            <div className="notApproved-box">
              <h3>Approval Required!!</h3>
              <p>
                Your application is under processing. It needs approval from the administrator. Please be patient.
              </p>
            </div>
          )}

          {userDetails.approval === 'rejected' && (
            <div className="notApproved-box rejected">
              <h3>Application Rejected!!</h3>
              <p>We are sorry to inform you that your application has been rejected.</p>
            </div>
          )}

          {userDetails.approval === 'approved' && (
            <div className="admin-page-cards">
              <div className="card admin-card">
                <h4>Bookings</h4>
                <p>{bookingCount}</p>
                <button onClick={() => navigate('/flight-bookings')}>View all</button>
              </div>

              <div className="card admin-card">
                <h4>Flights</h4>
                <p>{flightsCount}</p>
                <button onClick={() => navigate('/flights')}>View all</button>
              </div>

              <div className="card admin-card">
                <h4>New Flight</h4>
                <p>(new route)</p>
                <button onClick={() => navigate('/new-flight')}>Add now</button>
              </div>
            </div>
          )}
        </>
      ) : (
        <p className="loading">Loading...</p>
      )}
    </div>
  );
};

export default FlightAdmin;