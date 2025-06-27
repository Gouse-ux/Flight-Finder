import React, { useContext, useEffect, useState } from 'react';
import '../styles/LandingPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { GeneralContext } from '../context/GeneralContext';

const LandingPage = () => {
  const [error, setError] = useState('');
  const [checkBox, setCheckBox] = useState(false);

  const [departure, setDeparture] = useState('');
  const [destination, setDestination] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');

  const [flights, setFlights] = useState([]);

  const navigate = useNavigate();
  const { setTicketBookingDate } = useContext(GeneralContext);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const userType = localStorage.getItem('userType');
    if (userType === 'admin') navigate('/admin');
    else if (userType === 'flight-operator') navigate('/flight-admin');
  }, []);

  const fetchFlights = async () => {
    const now = new Date();
    const d1 = new Date(departureDate);
    const d2 = new Date(returnDate);

    if (!departure || !destination || !departureDate || (checkBox && !returnDate)) {
      setError('Please fill all the inputs');
      return;
    }

    if ((checkBox && (d1 <= now || d2 <= d1)) || (!checkBox && d1 < now)) {
      setError('Please check the dates');
      return;
    }

    setError('');
    const res = await axios.get('http://localhost:6001/fetch-flights');
    setFlights(res.data);
  };

  const handleTicketBooking = (id, origin, destination) => {
    const dateToBook = origin === departure ? departureDate : returnDate;
    if (userId) {
      setTicketBookingDate(dateToBook);
      navigate(`/book-flight/${id}`);
    } else {
      navigate('/auth');
    }
  };

  const cities = [
    "Chennai", "Banglore", "Hyderabad", "Mumbai", "Indore",
    "Delhi", "Pune", "Trivendrum", "Bhopal", "Kolkata", "Varanasi", "Jaipur"
  ];

  const flightCard = (flight) => (
    <div className="Flight" key={flight._id}>
      <div><p><b>{flight.flightName}</b></p><p><b>Flight Number:</b> {flight.flightId}</p></div>
      <div><p><b>Start:</b> {flight.origin}</p><p><b>Departure Time:</b> {flight.departureTime}</p></div>
      <div><p><b>Destination:</b> {flight.destination}</p><p><b>Arrival Time:</b> {flight.arrivalTime}</p></div>
      <div><p><b>Price:</b> ₹{flight.basePrice}</p><p><b>Seats:</b> {flight.totalSeats}</p></div>
      <button className="btn btn-primary" onClick={() => handleTicketBooking(flight._id, flight.origin, flight.destination)}>Book Now</button>
    </div>
  );

  return (
    <div className="landingPage">
      <div className="landingHero">
        <div className="landingHero-title">
          <h1 className="banner-h1">Embark on an Extraordinary Flight Booking Adventure!</h1>
          <p className="banner-p">Unleash your travel desires and book unforgettable journeys to amazing destinations.</p>
        </div>

        <div className="Flight-search-container input-container mb-4">
          <div className="form-check form-switch">
            <input className="form-check-input" type="checkbox" id="returnCheck" onChange={(e) => setCheckBox(e.target.checked)} />
            <label className="form-check-label" htmlFor="returnCheck">Return journey</label>
          </div>

          <div className="Flight-search-container-body">
            {/* Departure Select */}
            <div className="form-floating">
              <select className="form-select" value={departure} onChange={(e) => setDeparture(e.target.value)}>
                <option value="" disabled>Select</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              <label>Departure City</label>
            </div>

            {/* Destination Select */}
            <div className="form-floating">
              <select className="form-select" value={destination} onChange={(e) => setDestination(e.target.value)}>
                <option value="" disabled>Select</option>
                {cities.map(city => <option key={city} value={city}>{city}</option>)}
              </select>
              <label>Destination City</label>
            </div>

            {/* Dates */}
            <div className="form-floating mb-3">
              <input type="date" className="form-control" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} />
              <label>Journey date</label>
            </div>

            {checkBox && (
              <div className="form-floating mb-3">
                <input type="date" className="form-control" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} />
                <label>Return date</label>
              </div>
            )}

            <button className="btn btn-primary" onClick={fetchFlights}>Search</button>
          </div>

          {error && <p className="text-danger mt-2">{error}</p>}
        </div>

        {/* Available Flights */}
        {flights.length > 0 && (
          <div className="availableFlightsContainer">
            <h1>Available Flights</h1>
            <div className="Flights">
              {flights
                .filter(f => checkBox
                  ? (f.origin === departure && f.destination === destination) || (f.origin === destination && f.destination === departure)
                  : f.origin === departure && f.destination === destination)
                .map(flightCard)}
              {flights.filter(f => f.origin === departure && f.destination === destination).length === 0 && (
                <h3>No flights available</h3>
              )}
            </div>
          </div>
        )}

        {/* About Section */}
        <section className="section-about p-4" id="about">
          <div className="container">
            <h2 className="section-title">About Us</h2>
            <p className="section-description">Welcome to our flight ticket booking app where we simplify travel planning for you...</p>
            <p className="section-description">Easily search, compare, and book flights all from one platform...</p>
            <span><h5>© 2023 SB FlightConnect - All rights reserved</h5></span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;