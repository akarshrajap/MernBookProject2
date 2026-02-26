import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../features/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Get token to decide what to show
  const { token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>ProjectManager</Link>
      
      <div>
        {token ? (
          <>
            <Link to="/" style={styles.link}>Dashboard</Link>
            <button onClick={handleLogout} style={styles.logoutBtn}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.registerBtn}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: { display: 'flex', justifyContent: 'space-between', padding: '1rem 2rem', background: '#2c3e50', color: 'white', alignItems: 'center' },
  logo: { fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' },
  link: { color: 'white', margin: '0 15px', textDecoration: 'none' },
  logoutBtn: { backgroundColor: '#e74c3c', color: 'white', border: 'none', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer' },
  registerBtn: { backgroundColor: '#27ae60', color: 'white', padding: '8px 15px', borderRadius: '4px', textDecoration: 'none' }
};

export default Navbar;