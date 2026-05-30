import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PropertyCard from "../components/property/PropertyCard";
import { useAuth } from "../context/AuthContext";
import { getUserShortlist, toggleInterest } from "../api/interestApi";

const Shortlist = () => {
  const { user } = useAuth();

  const [shortlist, setShortlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchShortlist = async () => {
    try {
      setLoading(true);

      const result = await getUserShortlist(user.id);

      if (result.status) {
        setShortlist(result.data);
      }
    } catch {
      alert("Unable to load shortlist");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.id) {
      fetchShortlist();
    }
  }, [user]);

  const handleRemove = async (propertyId) => {
    const result = await toggleInterest(user.id, propertyId);

    if (result.status) {
      setShortlist((prev) => prev.filter((item) => item.id !== propertyId));
    }
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

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
            <p className="mt-3 text-muted">Loading shortlist...</p>
          </div>
        )}

        {!loading && shortlist.length > 0 && (
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
        )}

        {!loading && shortlist.length === 0 && (
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