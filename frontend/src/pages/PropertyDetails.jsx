import { useParams, Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PropertyGallery from "../components/property/PropertyGallery";
import AmenityBadge from "../components/property/AmenityBadge";
import { getPropertyDetails } from "../api/propertyApi";
import { useAuth } from "../context/AuthContext";
import { checkInterest, toggleInterest } from "../api/interestApi";
import EnquiryForm from "../components/property/EnquiryForm";
import toast from "react-hot-toast";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();

  const [property, setProperty] = useState(null);
  const [isInterested, setIsInterested] = useState(false);
  const [loading, setLoading] = useState(false);
  const [interestLoading, setInterestLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPropertyDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getPropertyDetails(id);

      if (result.status) {
        setProperty(result.data);
      } else {
        setError(result.message);
      }
    } catch {
      setError("Unable to fetch property details");
    } finally {
      setLoading(false);
    }
  };

  const fetchInterestStatus = async () => {
    if (!isLoggedIn || !user?.id) return;

    const result = await checkInterest(user.id, id);

    if (result.status) {
      setIsInterested(result.data.interested);
    }
  };

  useEffect(() => {
    fetchPropertyDetails();
  }, [id]);

  useEffect(() => {
    fetchInterestStatus();
  }, [id, user]);

  const handleInterest = async () => {
    if (!isLoggedIn) {
  toast.error("Please login first");
  navigate("/login");
  return;
}

    try {
      setInterestLoading(true);

      const result = await toggleInterest(user.id, property.id);

      if (result.status) {
  setIsInterested(result.data.interested);

  if (result.data.interested) {
    toast.success("Property added to shortlist");
  } else {
    toast.success("Property removed from shortlist");
  }
}
    } catch {
  toast.error("Interest action failed");
} finally {
      setInterestLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary"></div>
        <p className="mt-3 text-muted">Loading property details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5 text-center">
        <h3>{error}</h3>
        <Link to="/properties" className="btn btn-primary mt-3">
          Back to Properties
        </Link>
      </div>
    );
  }

  if (!property) return null;

  return (
    <section className="property-details-section py-5">
      <div className="container">
        <Link to="/properties" className="back-link">
          <i className="bi bi-arrow-left"></i> Back to Listings
        </Link>

        <div className="row g-5 mt-2">
          <div className="col-lg-7">
            <PropertyGallery images={property.gallery || [property.image]} />
          </div>

          <div className="col-lg-5">
            <div className="details-card">
              <span className="gender-badge-static">{property.gender}</span>

              <h1 className="fw-bold mt-3">{property.name}</h1>

              <p className="text-muted">
                <i className="bi bi-geo-alt"></i> {property.location}
              </p>

              <div className="d-flex gap-3 align-items-center mb-3">
                <span className="rating-badge">
                  <i className="bi bi-star-fill"></i> {property.rating}
                </span>
                <span className="text-muted">Verified Property</span>
              </div>

              <h2 className="price-text">₹{Number(property.price)}</h2>
              <p className="text-muted">per month</p>

              <hr />

              <h5 className="fw-bold">Description</h5>
              <p className="text-muted">{property.description}</p>

              <h5 className="fw-bold mt-4">Amenities</h5>
              <div className="details-amenities">
                {property.amenities?.map((item, index) => (
                  <AmenityBadge key={index} name={item} />
                ))}
              </div>

              <button
                className={
                  isInterested
                    ? "btn btn-danger btn-lg w-100 mt-4"
                    : "btn btn-primary btn-lg w-100 mt-4"
                }
                onClick={handleInterest}
                disabled={interestLoading}
              >
                {interestLoading
                  ? "Please wait..."
                  : isInterested
                  ? "Remove Interest"
                  : "Mark as Interested"}
              </button>

              {isInterested && (
                <div className="alert alert-success mt-3 mb-0">
                  Property added to your shortlist.
                </div>
              )}

              {isLoggedIn ? (
  <EnquiryForm propertyId={property.id} />
) : (
  <div className="alert alert-info mt-4">
    Please login to contact the owner.
  </div>
)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyDetails;