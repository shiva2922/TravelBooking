import { Link, useLocation } from 'react-router-dom';
import '../cssfiles/NavBar.css';

function NavBar() {
  const location = useLocation();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <div className="logo">
          <span className="logo-icon">✈️</span>
          <span className="logo-text">Argo</span>
        </div>
      </div>

      <nav className="navbar-links">
        <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
        <Link to="/my-bookings" className={location.pathname === '/my-bookings' ? 'active' : ''}>My Bookings</Link>
        <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>Profile</Link>
        <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>Admin</Link>
      </nav>

      <div className="navbar-right">
        <img
          src="https://i.pravatar.cc/40"
          alt="User"
          className="user-avatar"
        />
      </div>
    </header>
  );
}

export default NavBar;
