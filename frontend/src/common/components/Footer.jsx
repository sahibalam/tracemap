import { Link } from 'react-router-dom'

export function Footer() {
  const handleContactClick = () => {
    window.location.href = 'mailto:support@tradesmap.com?subject=Contact%20Enquiry';
  };

  return (
    <footer className="homeFooter">
      <div className="footerContent">
        <div className="footerBrand">
          <span className="footerBrandText">TradesMap</span>
          <span className="footerDivider">|</span>
          <span className="footerCopyright">© {new Date().getFullYear()} All rights reserved</span>
        </div>
        <nav className="footerNav">
          <Link to="/about" className="footerLink">
            About Us
          </Link>
          <span className="footerNavDivider">•</span>
          <Link to="/privacy" className="footerLink">
            Privacy Policy
          </Link>
          <span className="footerNavDivider">•</span>
          <Link to="/terms" className="footerLink">
            Terms & Conditions
          </Link>
          <span className="footerNavDivider">•</span>
          <button 
            type="button"
            className="footerLink" 
            onClick={handleContactClick}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
          >
            Contact Us
          </button>
        </nav>
      </div>
    </footer>
  )
}