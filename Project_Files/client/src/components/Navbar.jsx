import React, { useContext, useState } from 'react';
import '../styles/Navbar.css';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../context/GeneralContext';

const Navbar = () => {
  const navigate = useNavigate();
  const usertype = localStorage.getItem('userType');
  const { logout } = useContext(GeneralContext);

  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const NavLinks = () => (
    <div className={`nav-options ${menuOpen ? 'active' : ''}`}>
      {usertype === 'customer' && (
        <>
          <p onClick={() => navigate('/')}>Home</p>
          <p onClick={() => navigate('/bookings')}>Bookings</p>
          <p onClick={logout}>Logout</p>
        </>
      )}
      {usertype === 'admin' && (
        <>
          <p onClick={() => navigate('/admin')}>Home</p>
          <p onClick={() => navigate('/all-users')}>Users</p>
          <p onClick={() => navigate('/all-bookings')}>Bookings</p>
          <p onClick={() => navigate('/all-flights')}>Flights</p>
          <p onClick={logout}>Logout</p>
        </>
      )}
      {usertype === 'flight-operator' && (
        <>
          <p onClick={() => navigate('/flight-admin')}>Home</p>
          <p onClick={() => navigate('/flight-bookings')}>Bookings</p>
          <p onClick={() => navigate('/flights')}>Flights</p>
          <p onClick={() => navigate('/new-flight')}>Add Flight</p>
          <p onClick={logout}>Logout</p>
        </>
      )}
      {!usertype && (
        <>
          <p onClick={() => navigate('/')}>Home</p>
          <p onClick={() => navigate('/auth')}>Login</p>
        </>
      )}
    </div>
  );

  return (
    <div className="navbar">
      <h3>
        SB Flights
        {usertype === 'admin' && ' (Admin)'}
        {usertype === 'flight-operator' && ' (Operator)'}
      </h3>

      <div className="hamburger" onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      <NavLinks />
    </div>
  );
};

export default Navbar;