import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({ user, setUser }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await axios.post("/api/auth/logout");
    setUser(null);
    navigate("/"); //navigating to home page
  };

  return (
    <nav className="bg-gray-800 text-white ">
      <div className="max-w-6xl mx-auto p-4 flex justify-between items-center">
        <Link to="/" className="font-bold">
          CourierPro
        </Link>

        <div>
          {user ? (
            <>
              <Link to="/create-shipment" className="mx-2">
                Create
              </Link>

              <Link to="/my-shipments" className="mx-2">
                My Shipments
              </Link>

              <Link to="/track" className="mx-2">
                Track
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-3 py-1 rounded ml-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="mx-2">
                Login
              </Link>
              <Link to="/register" className="mx-2">
                Register
              </Link>

              <Link to="/track" className="mx-2">
                Track
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
