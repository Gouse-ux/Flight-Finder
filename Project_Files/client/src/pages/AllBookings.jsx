import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/AllBookings.css';

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-bookings');
      setBookings(response.data.reverse());
    } catch (err) {
      console.error('Failed to fetch bookings', err);
    }
  };

  const cancelTicket = async (id) => {
    try {
      await axios.put("http://localhost:6001/cancel-ticket/${id}");
      alert("Ticket cancelled!");
      fetchBookings();
    } catch (err) {
      console.error('Failed to cancel ticket', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="user-bookingsPage">
      <h1>All Bookings</h1>

      <div className="user-bookings">
        {bookings.map((booking) => (
          <div className="user-booking" key={booking._id}>
            <p><b>Booking ID:</b> {booking._id}</p>

            <span>
              <p><b>Mobile:</b> {booking.mobile}</p>
              <p><b>Email:</b> {booking.email}</p>
            </span>

            <span>
              <p><b>Flight ID:</b> {booking.flightId}</p>
              <p><b>Flight Name:</b> {booking.flightName}</p>
            </span>

            <span>
              <p><b>Onboarding:</b> {booking.departure}</p>
              <p><b>Destination:</b> {booking.destination}</p>
            </span>

            <span className="passenger-list">
              <div>
                <p><b>Passengers:</b></p>
                <ol>
                  {booking.passengers.map((p, i) => (
                    <li key={i}>
                      <p><b>Name:</b> {p.name}, <b>Age:</b> {p.age}</p>
                    </li>
                  ))}
                </ol>
              </div>
              {booking.bookingStatus === 'confirmed' && (
                <p><b>Seats:</b> {booking.seats}</p>
              )}
            </span>

            <span>
              <p><b>Booking Date:</b> {booking.bookingDate.slice(0, 10)}</p>
              <p><b>Journey Date:</b> {booking.journeyDate.slice(0, 10)}</p>
            </span>

            <span>
              <p><b>Journey Time:</b> {booking.journeyTime}</p>
              <p><b>Total Price:</b> ₹{booking.totalPrice}</p>
            </span>

            <p style={{ color: booking.bookingStatus === 'cancelled' ? 'red' : '#1c527e' }}>
              <b>Booking Status:</b> {booking.bookingStatus}
            </p>

            {booking.bookingStatus === 'confirmed' && (
              <button className="cancel-button" onClick={() => cancelTicket(booking._id)}>
                Cancel Ticket
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBookings;