import { useEffect, useState } from "react";
import { getEnquiries } from "../api/enquiryApi";

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchEnquiries = async () => {
    try {
      setLoading(true);

      const result = await getEnquiries();

      if (result.status) {
        setEnquiries(result.data);
      }
    } catch {
      alert("Unable to fetch enquiries");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <section className="py-5">
      <div className="container">
        <h1 className="fw-bold">Admin Enquiries</h1>
        <p className="text-muted">
          View all student enquiries submitted for PG properties.
        </p>

        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary"></div>
          </div>
        )}

        {!loading && (
          <div className="table-responsive enquiry-table-wrapper">
            <table className="table table-hover align-middle">
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Phone</th>
                  <th>Email</th>
                  <th>Property</th>
                  <th>Location</th>
                  <th>Message</th>
                </tr>
              </thead>

              <tbody>
                {enquiries.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.phone}</td>
                    <td>{item.user_email}</td>
                    <td>{item.property_name}</td>
                    <td>{item.location}</td>
                    <td>{item.message}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            {enquiries.length === 0 && (
              <div className="empty-state">
                <i className="bi bi-inbox"></i>
                <h4>No enquiries found</h4>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminEnquiries;