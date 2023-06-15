import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../UserContex';
import  { useState } from 'react';
import axios from 'axios';


const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  function handleLogout() {
    axios.post("/logout")
      .then(response => {
        console.log(response.data);
       
        window.location.reload();
      })
      .catch(error => {
        console.error(error);
      });
  }
  





  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div>
            <span className="text-white text-xl font-semibold">My Website</span>
          </div>
          <div className="text-white text- font-semibold">
                <Link to="/solve">All Questions</Link>
              </div>
              <div className="text-white text- font-semibold">
                <Link to="/admin">Admin login</Link>
              </div>
          <div>
            <button className="text-white focus:outline-none" onClick={toggleDropdown}>
              <svg
                className="h-6 w-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <path
                  d="M12 12C14.2091 12 16 10.2091 16 8C16 5.79086 14.2091 4 12 4C9.79086 4 8 5.79086 8 8C8 10.2091 9.79086 12 12 12ZM12 14C8.68629 14 6 16.6863 6 20H18C18 16.6863 15.3137 14 12 14Z"
                />
              </svg>
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg overflow-hidden shadow-xl">
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
                  profile
                </button>
                <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" onClick={handleLogout}>
               Logout
              </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

