const AmenityBadge = ({ name }) => {
  return (
    <span className="amenity-badge">
      <i className="bi bi-check-circle-fill"></i> {name}
    </span>
  );
};

export default AmenityBadge;