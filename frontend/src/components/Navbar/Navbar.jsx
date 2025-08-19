import { useState, useEffect } from "react";
import logo from "../../assets/blog-logo.svg";
import { useNavigate, NavLink } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "../../api/axios";

export default function Navbar() {
  const navigate = useNavigate();
  const [role, setRole] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Mobile menu
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Category dropdown
  const [categories, setCategories] = useState([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("category/all"); 
        setCategories(res.data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, []);

  // Decode token for role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error("Invalid token");
        localStorage.removeItem("token");
      }
    }
  }, []);

  const handleClick = () => {
    if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/user");
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="p-5 sm:p-3 shadow-md">
      <div className="flex justify-between items-center sm:mx-4 lg:mx-16">
        {/* Left side: Logo */}
        <div className="flex items-center gap-5">
          <img
            onClick={() => navigate("/")}
            className="cursor-pointer"
            src={logo}
            alt="logo"
            width={50}
          />
          <h3 className="text-xl sm:text-2xl font-semibold cursor-default text-blue-950">
            MyBlogSpace
          </h3>
        </div>

        {/* Hamburger Button for mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex justify-between items-center gap-8 text-lg relative">
          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-blue-950 font-bold underline"
                : "hover:underline hover:text-green-900"
            }
            to={"/"}
          >
            Home
          </NavLink>

          {/* Categories Dropdown */}
          <div
            className="relative"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
           
          >
            <button className="hover:underline hover:text-green-900 flex items-center gap-1">
              Categories ▼
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
                {categories.length > 0 ? (
                  categories.map((cat) => (
                    <NavLink
                      key={cat._id}
                      to={`/categories/${cat.slug}`}
                      className="block px-4 py-2 hover:bg-gray-100 text-blue-950"
                    >
                      {cat.name}
                    </NavLink>
                  ))
                ) : (
                  <p className="px-4 py-2 text-gray-500">Loading...</p>
                )}
              </div>
            )}
          </div>

          <NavLink
            className={({ isActive }) =>
              isActive
                ? "text-blue-950 font-bold underline"
                : "hover:underline text-blue-950 hover:text-green-900"
            }
            to={"/about"}
          >
            About
          </NavLink>
        </div>

        {/* Dashboard / Login Button */}
        <div className="hidden md:block">
          <button
            onClick={handleClick}
            className="flex items-center gap-2 px-5 py-3 border-none text-white rounded-xl lg:text-base sm:text-sm cursor-pointer bg-blue-950"
          >
            {role ? "Dashboard" : "Signup or Login"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 px-4 flex flex-col gap-3 text-lg">
          <NavLink
            to={"/"}
            onClick={() => setIsMenuOpen(false)}
            className="hover:underline hover:text-green-900"
          >
            Home
          </NavLink>

          {/* Mobile Categories */}
          <div className="flex flex-col">
            <span className="font-semibold">Categories:</span>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <NavLink
                  key={cat._id}
                  to={`/categories/${cat.slug}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="pl-4 py-1 hover:underline hover:text-green-900"
                >
                  {cat.name}
                </NavLink>
              ))
            ) : (
              <p className="pl-4 py-1 text-gray-500">Loading...</p>
            )}
          </div>

          <NavLink
            to={"/about"}
            onClick={() => setIsMenuOpen(false)}
            className="hover:underline hover:text-green-900"
          >
            About
          </NavLink>

          <button
            onClick={() => {
              handleClick();
              setIsMenuOpen(false);
            }}
            className="mt-3 px-4 py-2 bg-blue-950 text-white rounded-lg"
          >
            {role ? "Dashboard" : "Signup or Login"}
          </button>
        </div>
      )}
    </div>
  );
}
