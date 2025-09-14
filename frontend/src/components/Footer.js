// import { FaFacebookF, FaLinkedinIn, FaInstagram, FaTwitter } from 'react-icons/fa';
import '../cssfiles/Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <div className="footer-column">
            <h4>Company</h4>
            <a>About Us</a>
            <a >Careers</a>
            <a >Contact</a>
          </div>
          <div className="footer-column">
            <h4>Resources</h4>
            <a >Help Center</a>
            <a >Safety</a>
            <a >Guidelines</a>
          </div>
          <div className="footer-column">
            <h4>Legal</h4>
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
          </div>
        </div>
        <div className="footer-socials">
          {/* <a><FaFacebookF /></a>
          <a><FaLinkedinIn /></a>
          <a><FaInstagram /></a>
          <a><FaTwitter /></a> */}
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2024 TravelPro. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
