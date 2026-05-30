import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section className="not-found-page">
      <div className="container text-center">
        <h1 className="display-1 fw-bold text-primary">404</h1>

        <h2>Page Not Found</h2>

        <p className="text-muted">
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="btn btn-primary btn-lg">
          Back To Home
        </Link>
      </div>
    </section>
  );
};

export default NotFound;