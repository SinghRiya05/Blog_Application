import {useState,useEffect} from 'react';
import arrow from '../../assets/arrow.svg'; // ✅ adjust path as per your folder
import logo from '../../assets/blog-logo.svg'; 
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from "jwt-decode";


export default function Navbar() {

 const navigate=useNavigate();
 const [role, setRole] = useState(null);

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

const handleClick=()=>{
   if (role === "admin") {
      navigate("/admin");
    } else if (role === "user") {
      navigate("/user");
    } else {
      navigate("/login");
    }
}

  return (
    <div className=" p-5 sm:p-3">
      <div className="flex justify-between items-center sm:mx-4 lg:mx-16 ">
        
        <div className="flex items-center gap-5 ">
          <img onClick={()=>navigate("/")} className='cursor-pointer' src={logo} alt="logo" width={50} />
          <h3 className="text-xl sm:text-2xl md:text-2.5xl lg:text-2.5xl font-semibold cursor-default">
            MyBlogSpace
          </h3>
        </div>
        <div>
          <button onClick={handleClick}
            className="flex items-center gap-2 px-5 py-3 border-none text-white rounded-xl lg:text-base sm:text-sm cursor-pointer"
            style={{ backgroundColor: '#352f44' }}
          >
           {role?"Dashboard" :"Signup or Login"}
            <img src={arrow} alt="arrow" width={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
