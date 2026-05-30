import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user } = useAuth();

  return (
    <section className="py-5">
      <div className="container">
        <div className="profile-card mx-auto">
          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <h2 className="fw-bold text-center mt-3">{user?.name}</h2>
          <p className="text-muted text-center">{user?.email}</p>

          <hr />

          <div className="profile-info">
            <p>
              <strong>Name:</strong> {user?.name}
            </p>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>Phone:</strong> {user?.phone || "Not available"}
            </p>
          </div>

          <Link to="/shortlist" className="btn btn-primary w-100 mt-3">
            View My Shortlist
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Profile;