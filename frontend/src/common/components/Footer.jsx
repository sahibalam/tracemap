import { Link } from 'react-router-dom'

export function Footer() {
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
          <a 
            className="footerLink" 
            href="mailto:support@tradesmap.com?subject=Contact%20Enquiry"
            onClick={(e) => {
              // Let the default behavior happen
              // Just log for debugging
              console.log('Contact link clicked');
            }}
          >
            Contact Us
          </a>
        </nav>
      </div>
    </footer>
  )
}