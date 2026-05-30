import { Link } from "react-router-dom";

const Home = () => {
  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="row align-items-center min-vh-75">
            <div className="col-lg-6">
              <span className="badge bg-primary-subtle text-primary mb-3">
                Student Accommodation Platform
              </span>

              <h1 className="display-4 fw-bold mb-4">
                Find Your Perfect PG Near College
              </h1>

              <p className="lead text-muted mb-4">
                Explore verified PG accommodations with affordable pricing,
                amenities, ratings, and shortlist your favorite properties.
              </p>

              <div className="d-flex gap-3 flex-wrap">
                <Link to="/properties" className="btn btn-primary btn-lg">
                  Explore PGs
                </Link>

                <Link to="/signup" className="btn btn-outline-primary btn-lg">
                  Create Account
                </Link>
              </div>
            </div>

            <div className="col-lg-6 mt-5 mt-lg-0">
              <div className="hero-card">
                <div className="search-box">
                  <h4 className="fw-bold mb-3">Quick Search</h4>

                  <div className="row g-3">
                    <div className="col-md-6">
                      <select className="form-select">
                        <option>Select City</option>
                        <option>Noida</option>
                        <option>Delhi</option>
                        <option>Gurgaon</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <select className="form-select">
                        <option>Budget</option>
                        <option>Below ₹5000</option>
                        <option>₹5000 - ₹10000</option>
                        <option>Above ₹10000</option>
                      </select>
                    </div>

                    <div className="col-md-12">
                      <Link to="/properties" className="btn btn-primary w-100">
                        Search Accommodation
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="stats-box mt-4">
                  <div>
                    <h3>120+</h3>
                    <p>PG Listings</p>
                  </div>
                  <div>
                    <h3>15+</h3>
                    <p>Cities</p>
                  </div>
                  <div>
                    <h3>4.8</h3>
                    <p>Avg Rating</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="fw-bold">Why Choose StayFinder?</h2>
            <p className="text-muted">
              Designed for students who need reliable and comfortable housing.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-shield-check"></i>
                <h5>Verified PGs</h5>
                <p>All properties are checked for safety and authenticity.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-cash-coin"></i>
                <h5>Budget Friendly</h5>
                <p>Find PGs according to your budget and location.</p>
              </div>
            </div>

            <div className="col-md-4">
              <div className="feature-card">
                <i className="bi bi-heart"></i>
                <h5>Shortlist Easily</h5>
                <p>Save your favorite PGs and compare them anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;