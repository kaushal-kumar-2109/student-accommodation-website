import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/property/PropertyCard";
import {
  getShortlist,
  removeFromShortlist,
} from "../utils/shortlistStorage";

const Shortlist = () => {
  const [shortlist, setShortlist] = useState([]);

  useEffect(() => {
    setShortlist(getShortlist());
  }, []);

  const handleRemove = (propertyId) => {
    removeFromShortlist(propertyId);

    const updatedShortlist = getShortlist();
    setShortlist(updatedShortlist);
  };

  return (
    <section className="py-5">
      <div className="container">
        <div className="shortlist-header">
          <div>
            <h1 className="fw-bold">My Shortlist</h1>
            <p className="text-muted mb-0">
              Your interested PG accommodations appear here.
            </p>
          </div>

          <Link to="/properties" className="btn btn-primary">
            Explore More PGs
          </Link>
        </div>

        {shortlist.length > 0 ? (
          <div className="row g-4 mt-3">
            {shortlist.map((property) => (
              <div className="col-lg-4 col-md-6" key={property.id}>
                <PropertyCard property={property} />

                <button
                  className="btn btn-outline-danger w-100 mt-3"
                  onClick={() => handleRemove(property.id)}
                >
                  <i className="bi bi-trash"></i> Remove from Shortlist
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-state mt-4">
            <i className="bi bi-heart"></i>
            <h4>No shortlisted properties yet</h4>
            <p>Start exploring and mark properties as interested.</p>
            <Link to="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default Shortlist;