import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { properties } from "../data/properties";
import PropertyGallery from "../components/property/PropertyGallery";
import AmenityBadge from "../components/property/AmenityBadge";

import {
  addToShortlist,
  removeFromShortlist,
  isPropertyShortlisted,
} from "../utils/shortlistStorage";

const PropertyDetails = () => {
  const { id } = useParams();
  const property = properties.find((item) => item.id === Number(id));

  const [isInterested, setIsInterested] = useState(
    isPropertyShortlisted(Number(id))
  );

  const handleInterest = () => {
    if (isInterested) {
      removeFromShortlist(property.id);
      setIsInterested(false);
    } else {
      addToShortlist(property);
      setIsInterested(true);
    }
  };

  if (!property) {
    return (
      <div className="container py-5 text-center">
        <h2>Property Not Found</h2>
        <Link to="/properties" className="btn btn-primary mt-3">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <section className="property-details-section py-5">
      <div className="container">
        <Link to="/properties" className="back-link">
          <i className="bi bi-arrow-left"></i> Back to Listings
        </Link>

        <div className="row g-5 mt-2">
          <div className="col-lg-7">
            <PropertyGallery images={property.gallery} />
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

              <h2 className="price-text">₹{property.price}</h2>
              <p className="text-muted">per month</p>

              <hr />

              <h5 className="fw-bold">Description</h5>
              <p className="text-muted">{property.description}</p>

              <h5 className="fw-bold mt-4">Amenities</h5>
              <div className="details-amenities">
                {property.amenities.map((item, index) => (
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
              >
                {isInterested ? (
                  <>
                    <i className="bi bi-heart-fill"></i> Remove Interest
                  </>
                ) : (
                  <>
                    <i className="bi bi-heart"></i> Mark as Interested
                  </>
                )}
              </button>

              {isInterested && (
                <div className="alert alert-success mt-3 mb-0">
                  Property added to your shortlist successfully.
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