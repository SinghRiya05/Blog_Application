import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppRoutes from "./routes"; 
import {jwtDecode} from "jwt-decode";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const { role } = jwtDecode(token);
        setRole(role);
      } catch (err) {
        console.error("Invalid token", err);
        setRole(null);
      }
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <>
    <ScrollToTop/>
      <AppRoutes role={role} setRole={setRole} />
      <ToastContainer position="top-center" autoClose={2000} />
    </>
  );
}

export default App;
