import { useEffect, useMemo, useState } from "react";
import PropertyCard from "../components/property/PropertyCard";
import PropertyFilter from "../components/property/PropertyFilter";
import { getProperties } from "../api/propertyApi";
import toast from "react-hot-toast";

const Properties = () => {
  const [filters, setFilters] = useState({
    search: "",
    city: "",
    budget: "",
    gender: "",
    page: 1,
  });

  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const propertiesPerPage = 6;

  const fetchProperties = async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getProperties({
        city: filters.city,
        budget: filters.budget,
        gender: filters.gender,
      });

      if (result.status) {
        setProperties(result.data);
      } else {
        setError(result.message);
        toast.error(result.message);
      }
    } catch {
      setError("Unable to fetch properties from server");
      toast.error("Unable to fetch properties from server");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, [filters.city, filters.budget, filters.gender]);

  const searchedProperties = useMemo(() => {
    return properties.filter((property) => {
      const keyword = filters.search.toLowerCase();

      return (
        property.name.toLowerCase().includes(keyword) ||
        property.location.toLowerCase().includes(keyword) ||
        property.city.toLowerCase().includes(keyword)
      );
    });
  }, [properties, filters.search]);

  const totalPages = Math.ceil(searchedProperties.length / propertiesPerPage);

  const paginatedProperties = useMemo(() => {
    const startIndex = (filters.page - 1) * propertiesPerPage;
    return searchedProperties.slice(startIndex, startIndex + propertiesPerPage);
  }, [searchedProperties, filters.page]);

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "",
      budget: "",
      gender: "",
      page: 1,
    });
  };

  const changePage = (pageNumber) => {
    setFilters({
      ...filters,
      page: pageNumber,
    });

    window.scrollTo({
      top: 250,
      behavior: "smooth",
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
            <h5 className="mb-0">{searchedProperties.length} Properties Found</h5>
            <span className="text-muted small">
              Search, filters and pagination enabled
            </span>
          </div>

          {loading && (
            <div className="text-center py-5">
              <div className="spinner-border text-primary"></div>
              <p className="mt-3 text-muted">Loading properties...</p>
            </div>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          {!loading && !error && paginatedProperties.length > 0 && (
            <>
              <div className="row g-4">
                {paginatedProperties.map((property) => (
                  <div className="col-lg-4 col-md-6" key={property.id}>
                    <PropertyCard property={property} />
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="pagination-box mt-5">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={
                        filters.page === index + 1
                          ? "pagination-btn active"
                          : "pagination-btn"
                      }
                      onClick={() => changePage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {!loading && !error && paginatedProperties.length === 0 && (
            <div className="empty-state">
              <i className="bi bi-house-x"></i>
              <h4>No properties found</h4>
              <p>Try changing your search or filter options.</p>
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