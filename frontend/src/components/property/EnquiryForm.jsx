import { useState } from "react";
import { createEnquiry } from "../../api/enquiryApi";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const EnquiryForm = ({ propertyId }) => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    message: "I am interested in this PG. Please contact me.",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setSuccess("");
      setError("");

      const result = await createEnquiry({
        user_id: user.id,
        property_id: propertyId,
        ...formData,
      });

      if (result.status) {
  setSuccess(result.message);
  toast.success("Enquiry submitted successfully");
} else {
  setError(result.message);
  toast.error(result.message);
}
    } catch {
  setError("Unable to submit enquiry");
  toast.error("Unable to submit enquiry");
} finally {
      setLoading(false);
    }
  };

  return (
    <div className="enquiry-card mt-4">
      <h5 className="fw-bold mb-3">Contact Owner</h5>

      {success && <div className="alert alert-success">{success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <input
          className="form-control mb-3"
          name="name"
          placeholder="Your name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          className="form-control mb-3"
          name="phone"
          placeholder="Phone number"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          className="form-control mb-3"
          rows="4"
          name="message"
          placeholder="Message"
          value={formData.message}
          onChange={handleChange}
        ></textarea>

        <button className="btn btn-dark w-100" disabled={loading}>
          {loading ? "Sending..." : "Send Enquiry"}
        </button>
      </form>
    </div>
  );
};

export default EnquiryForm;