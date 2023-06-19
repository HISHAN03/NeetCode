import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AdminQ from './admin-questions';
import Navbar from './components/navbar';
import Footer from './components/footer';

const AdminLogin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      username: username,
      password: password,
    };

    axios
      .post('/admin-login', data)
      .then((response) => {
        console.log(response.data);
        // Handle successful login
        setIsLoggedIn(true);
        navigate('/edit_delet');
      })
      .catch((error) => {
        console.error(error);
        // Handle login error
        setLoginError('Invalid username or password');
      });
  };

  return (
    <>
    <Navbar />
      {isLoggedIn ? (
        <AdminQ />
      ) : (
        <div className="flex items-center justify-center h-screen bg-gray-100">
          <div className="bg-white rounded shadow p-8 max-w-sm w-full">
            <h2 className="text-2xl font-semibold mb-4">Admin Login</h2>
            {loginError && (
              <div className="bg-red-500 text-white text-sm font-semibold rounded p-2 mb-4">
                {loginError}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block font-medium mb-1">
                  Username
                </label>
                <input
                  type="text"
                  name="aname"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  id="username"
                  placeholder="Enter username"
                  value={username}
                  onChange={handleUsernameChange}
                />
              </div>
              <div className="mb-6">
                <label htmlFor="password" className="block font-medium mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="apass"
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-indigo-500"
                  id="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                id="login-btn"
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Login
              </button>
            </form>
          </div>
        </div>
        
      )}
        
    </>
  );
};

export default AdminLogin;
