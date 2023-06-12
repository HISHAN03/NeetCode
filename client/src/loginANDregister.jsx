import React, { useState } from 'react';
import axios from "axios";
import './login.css';
import {useContext} from "react";
import {UserContext} from "./UserContex.jsx";

function Login() 
{
  const [Username, setUsername] = useState('');
  const [Password, setPassword] = useState('');
  const [iSLoginOrRegister,SetiSLoginOrRegister]=useState('login')
  const {setUsername:setLoggedInUsername, setId} = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url = iSLoginOrRegister === 'register' ? '/register' : '/login';
    try {
      const { data } = await axios.post(url, { Username, Password }, { withCredentials: true });
      setLoggedInUsername(Username);
      setId(data.id);
      console.log("done");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="bg-gradient h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold text-white mb-8 shadow-lg">
        <span className="text-gradient">Neetcode</span>
      </h1>
      <div className="bg-white p-10 rounded-lg border border-gray-300 bg-opacity-25">
        {iSLoginOrRegister==='login' && (
        <h2 className="text-3xl text-gray-700 font-bold mb-5">Login</h2>
        )}
             {iSLoginOrRegister==='register' && (
        <h2 className="text-3xl text-gray-700 font-bold mb-5">Register</h2>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-gray-700 font-bold mb-2">Username</label>
            <input value={Username}
               onChange={ev => setUsername(ev.target.value)} type="text" id="username" name="username" placeholder="Enter your username" className="input-field" />
          </div>
          <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
          <input
  value={Password}
  onChange={ev => setPassword(ev.target.value)}
  type="password"
  id="password"
  name="password"
  placeholder="Enter your password"
  className="input-field"
/>
          </div>
          {iSLoginOrRegister === 'login'&&(
   <div>
   <button type="submit" className="bg-transparent text-gray-700 hover:bg-black-500 text-blue-dark font-semibold 
   hover:text-black py-2 px-4 border border-blue-dark hover:border-white rounded focus:outline-none focus:shadow-outline">Login</button>
  <p className="text-gray-800 mt-1">Don't have an account?<button href="#" onClick={() => SetiSLoginOrRegister('register')} className='hover:underline'>Register</button></p>
  </div>)}
  {iSLoginOrRegister === 'register'&&(
   <div>
   <button type="submit" className="bg-transparent text-gray-700 hover:bg-black-500 text-blue-dark font-semibold 
   hover:text-black py-2 px-4 border border-blue-dark hover:border-white rounded focus:outline-none focus:shadow-outline">register</button>
  <p className="text-gray-800 mt-1">have an account?<button href="#" onClick={() => SetiSLoginOrRegister('login')} className='hover:underline'>login</button></p>
  </div>)}
         
        </form>
      </div>
    </div>
  );
}

export default Login;
