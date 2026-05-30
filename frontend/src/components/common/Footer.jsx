const Footer = () => {
  return (
    <footer className="footer-section bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row gy-4">
          <div className="col-md-4">
            <h4 className="fw-bold">StayFinder</h4>
            <p className="text-white-50">
              A smart student accommodation platform to find safe, affordable,
              and comfortable PG rooms.
            </p>
          </div>

          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>Home</li>
              <li>PG Listings</li>
              <li>Shortlist</li>
              <li>Contact</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h5>Contact</h5>
            <p className="text-white-50 mb-1">Email: support@stayfinder.com</p>
            <p className="text-white-50">Phone: +91 98765 43210</p>
          </div>
        </div>

        <hr className="border-secondary" />

        <p className="text-center text-white-50 mb-0">
          © 2026 StayFinder. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;