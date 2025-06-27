import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AllFlights.css';

const AllFlights = () => {
  const [flights, setFlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchFlights = async () => {
    try {
      const response = await axios.get('http://localhost:6001/fetch-flights');
      setFlights(response.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load flights');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlights();
  }, []);

  return (
    <div className="allFlightsPage">
      <h1>All Flights</h1>

      {loading ? (
        <p>Loading flights...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="allFlights">
          {flights.map((Flight) => (
            <div className="allFlights-Flight" key={Flight._id}>
              <p><b>_id:</b> {Flight._id}</p>

              <span>
                <p><b>Flight Id:</b> {Flight.flightId}</p>
                <p><b>Flight Name:</b> {Flight.flightName}</p>
              </span>

              <span>
                <p><b>Starting Station:</b> {Flight.origin}</p>
                <p><b>Departure Time:</b> {Flight.departureTime}</p>
              </span>

              <span>
                <p><b>Destination:</b> {Flight.destination}</p>
                <p><b>Arrival Time:</b> {Flight.arrivalTime}</p>
              </span>

              <span>
                <p><b>Base Price:</b> ₹{Flight.basePrice}</p>
                <p><b>Total Seats:</b> {Flight.totalSeats}</p>
              </span>

              <button onClick={`() => navigate(/flight-details/${Flight._id})`}>
                View Details
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllFlights;