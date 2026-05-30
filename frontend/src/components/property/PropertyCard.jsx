import { Link } from "react-router-dom";
import { isPropertyShortlisted } from "../../utils/shortlistStorage";

const PropertyCard = ({ property }) => {
  const shortlisted = isPropertyShortlisted(property.id);

  return (
    <div className="property-card">
      <div className="property-img-wrapper">
        <img src={property.image} alt={property.name} className="property-img" />

        <span className="gender-badge">{property.gender}</span>

        {shortlisted && (
          <span className="shortlisted-badge">
            <i className="bi bi-heart-fill"></i>
          </span>
        )}
      </div>

      <div className="property-content">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h5 className="property-title">{property.name}</h5>

          <span className="rating-badge">
            <i className="bi bi-star-fill"></i> {property.rating}
          </span>
        </div>

        <p className="property-location">
          <i className="bi bi-geo-alt"></i> {property.location}
        </p>

        <div className="amenity-list">
          {property.amenities.slice(0, 3).map((item, index) => (
            <span key={index}>{item}</span>
          ))}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-4">
          <div>
            <h5 className="price-text">₹{property.price}</h5>
            <small className="text-muted">per month</small>
          </div>

          <Link to={`/properties/${property.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;