import { useEffect, useState } from "react";
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilter from "../components/property/PropertyFilter";
import { getProperties } from "../api/propertyApi";

const Properties = () => {
  const [filters, setFilters] = useState({
    city: "",
    budget: "",
    gender: "",
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getProperties(filters);

      if (result.status) {
        setProperties(result.data);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("Unable to fetch properties from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters]);

  const clearFilters = () => {
    setFilters({
      city: "",
      budget: "",
      gender: "",
    });
  };

  return (
    <>
      <section className="listing-hero">
        <div className="container">
          <h1 className="fw-bold">Explore Student PGs</h1>
          <p className="text-muted mb-0">
            Find safe, affordable, and verified student accommodation.
          </p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <PropertyFilter
            filters={filters}
            setFilters={setFilters}
            clearFilters={clearFilters}
          />

          <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
            <h5 className="mb-0">{properties.length} Properties Found</h5>
            <span className="text-muted small">
              AJAX filters without page reload
            </span>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-3 text-muted">Loading properties...</p>
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && properties.length > 0 && (
            <div className="row g-4">
              {properties.map((property) => (
                <div className="col-lg-4 col-md-6" key={property.id}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          )}

          {!loading && !error && properties.length === 0 && (
            <div className="empty-state">
              <i className="bi bi-house-x"></i>
              <h4>No properties found</h4>
              <p>Try changing your filter options.</p>
              <button className="btn btn-primary" onClick={clearFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Properties;