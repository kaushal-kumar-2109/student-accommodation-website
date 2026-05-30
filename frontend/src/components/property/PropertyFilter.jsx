const PropertyFilter = ({ filters, setFilters, clearFilters }) => {
  const handleChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="filter-box">
      <div className="row g-3 align-items-end">
        <div className="col-lg-3 col-md-6">
          <label className="form-label">City</label>
          <select
            name="city"
            className="form-select"
            value={filters.city}
            onChange={handleChange}
          >
            <option value="">All Cities</option>
            <option value="Noida">Noida</option>
            <option value="Delhi">Delhi</option>
            <option value="Gurgaon">Gurgaon</option>
          </select>
        </div>

        <div className="col-lg-3 col-md-6">
          <label className="form-label">Budget</label>
          <select
            name="budget"
            className="form-select"
            value={filters.budget}
            onChange={handleChange}
          >
            <option value="">Any Budget</option>
            <option value="5000">Below ₹5000</option>
            <option value="8000">Below ₹8000</option>
            <option value="10000">Below ₹10000</option>
            <option value="15000">Below ₹15000</option>
          </select>
        </div>

        <div className="col-lg-3 col-md-6">
          <label className="form-label">Gender</label>
          <select
            name="gender"
            className="form-select"
            value={filters.gender}
            onChange={handleChange}
          >
            <option value="">All</option>
            <option value="Boys">Boys</option>
            <option value="Girls">Girls</option>
            <option value="Co-living">Co-living</option>
          </select>
        </div>

        <div className="col-lg-3 col-md-6">
          <button className="btn btn-outline-secondary w-100" onClick={clearFilters}>
            Clear Filters
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyFilter;