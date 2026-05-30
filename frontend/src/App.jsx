import { Toaster } from "react-hot-toast";
import AppRoutes from "./routes/AppRoutes";
import Navbar from "./components/common/Navbar";
import Footer from "./components/common/Footer";

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
};

export default App;