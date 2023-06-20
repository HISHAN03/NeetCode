import axios from "axios";
import { UserContextProvider } from "./pages/UserContex";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Wwe from "./pages/Router";
import Home from "./pages/home";
import Admin from "./pages/admin";
import Edit from './pages/edit_delet'
import ADD_questions from './pages/admin-questions'

import SolveQuestionPage from "./pages/solveQuestions";



function App() {
 
  axios.defaults.baseURL = "https://backend-neetcode.onrender.com";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Wwe />} />
          <Route path="/solve" element={<Home />} />
          <Route path="/solve/:id" element={<SolveQuestionPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/add_questions" element={<ADD_questions />} />
          <Route path="/edit/:id" element={ <ADD_questions />} />
          <Route path="/edit_delet" element={<Edit />} />

          
          
          </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
