import axios from "axios";
import { UserContextProvider } from "./pages/UserContex";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wwe from "./pages/Router";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Edit from './pages/edit_delet'

import SolveQuestionPage from "./pages/solveQuestions";



function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Wwe />} />
          <Route path="/solve" element={<Home />} />
          <Route path="/solve/:id" element={<SolveQuestionPage />} />
          <Route path="/admin" element={<Admin />} />

          <Route path="/edit_delet" element={<Edit />} />

          
          
          </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
