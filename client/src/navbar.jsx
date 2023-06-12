import React from "react";

function Navbar() {
  return (
    <nav className="bg-blue-500 p-4 flex justify-between">
      <div>
        <a className="text-white font-bold hover:text-gray-200" href="/">
          Home
        </a>
        <a className="text-white font-bold ml-4 hover:text-gray-200" href="/about">
          About
        </a>
      </div>
      <div className="flex items-center">
        <span role="img" aria-label="User" className="text-white mr-2">
          👤
        </span>
        <a className="text-white font-bold hover:text-gray-200" href="/profile">
          My Profile
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
