import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminPanel from './pages/AdminPanel';
import Booking from './pages/Booking';
import MyBookings from './pages/MyBookings';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Checkout from "./pages/Checkout";
import BookingConfirmation from "./pages/BookingConfirmation";
import ViewTicket from './pages/ViewTicket';
import './App.css';

function AppContent() {
  const location = useLocation();

 
  const hideLayout = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
      {!hideLayout && <NavBar />}
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/confirmation/:id" element={<BookingConfirmation />} />
        <Route path="/view-ticket" element={<ViewTicket />} />

      </Routes>
      {!hideLayout && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
