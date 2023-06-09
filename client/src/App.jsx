import axios from "axios";
import {UserContextProvider} from "./UserContex";
import React from "react";
import Router from "./Router"

function App() {
  axios.defaults.baseURL = "http://localhost:4000"
  return (
    <>
     <UserContextProvider>
     <Router/>
     </UserContextProvider>
    </>)}

export default App

