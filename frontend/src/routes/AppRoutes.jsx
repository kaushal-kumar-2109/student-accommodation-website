import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Properties from "../pages/Properties";
import PropertyDetails from "../pages/PropertyDetails";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Shortlist from "../pages/Shortlist";
import NotFound from "../pages/NotFound";
import ProtectedRoute from "../components/common/ProtectedRoute";
import AdminEnquiries from "../pages/AdminEnquiries";
import Profile from "../pages/Profile";
import AdminRoute from "../components/common/AdminRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/properties" element={<Properties />} />
      <Route path="/properties/:id" element={<PropertyDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/admin/enquiries" element={<AdminEnquiries />} />
      <Route
  path="/admin/enquiries"
  element={
    <AdminRoute>
      <AdminEnquiries />
    </AdminRoute>
  }
/>
      <Route
  path="/profile"
  element={
    <ProtectedRoute>
      <Profile />
    </ProtectedRoute>
  }
/>
      <Route
        path="/shortlist"
        element={
          <ProtectedRoute>
            <Shortlist />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;