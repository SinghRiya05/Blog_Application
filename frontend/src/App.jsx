import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import AppRoutes from "./routes"; // Your routing setup
import ScrollToTop from "./components/ScrollToTop"; // Optional scroll helper

function App() {
  const navigate=useNavigate();
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setRole(null);
    setLoading(false);
    toast.info("Session expired. Please log in again.");
    setTimeout(() => {
      navigate("/login") 
    }, 1500);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);
        const { exp, role } = decoded;

        const isExpired = exp * 1000 < Date.now();

        if (isExpired) {
          console.log("Token expired.");
          handleLogout();
        } else {
          setRole(role);
          setLoading(false);

          // Set a timeout to auto-logout when token expires
          const timeLeft = exp * 1000 - Date.now();
          const timer = setTimeout(() => {
            handleLogout();
          }, timeLeft);

          return () => clearTimeout(timer); // Cleanup on unmount
        }
      } catch (error) {
        console.error("Token decoding failed:", error);
        handleLogout();
      }
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <ScrollToTop />
      <AppRoutes role={role} setRole={setRole} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
