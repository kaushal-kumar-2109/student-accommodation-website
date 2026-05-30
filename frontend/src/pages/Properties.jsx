import { useMemo, useState } from "react";
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilter from "../components/property/PropertyFilter";
import { properties } from "../data/properties";

const Properties = () => {
  const [filters, setFilters] = useState({
    city: "",
    budget: "",
    gender: "",
  });

  const filteredProperties = useMemo(() => {
    return properties.filter((property) => {
      const cityMatch = filters.city ? property.city === filters.city : true;
      const genderMatch = filters.gender
        ? property.gender === filters.gender
        : true;
      const budgetMatch = filters.budget
        ? property.price <= Number(filters.budget)
        : true;

      return cityMatch && genderMatch && budgetMatch;
    });
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
            <h5 className="mb-0">
              {filteredProperties.length} Properties Found
            </h5>

            <span className="text-muted small">
              Filter results without page reload
            </span>
          </div>

          {filteredProperties.length > 0 ? (
            <div className="row g-4">
              {filteredProperties.map((property) => (
                <div className="col-lg-4 col-md-6" key={property.id}>
                  <PropertyCard property={property} />
                </div>
              ))}
            </div>
          ) : (
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