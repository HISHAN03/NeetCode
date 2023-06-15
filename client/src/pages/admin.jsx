import React, { useState } from 'react';
import axios from 'axios';
import AdminQ from './admin-questions'
const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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
      password: password
    };

    axios
      .post('/admin-login', data)
      .then((response) => {
        console.log(response.data);
        // Handle successful login
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.error(error);
        // Handle login error
      });
  };

  return (
    <> {isLoggedIn ? (
      <AdminQ />
    ) : (
    
        <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-dark text-white text-center">
              <h4>Admin Login</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input type="text" name="aname" className="form-control" id="username" placeholder="Enter username" value={username} onChange={handleUsernameChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input type="password" name="apass" className="form-control" id="password" placeholder="Enter password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit" id="login-btn" className="btn btn-warning btn-block">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    )}</>
  );
};

export default AdminLogin;
