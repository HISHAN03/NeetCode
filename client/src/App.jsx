import axios from "axios";
import { UserContextProvider } from "./UserContex";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./home";
import Wwe from "./Router";

import SolveQuestionPage from "./solveQuestions";



function App() {
  axios.defaults.baseURL = "http://localhost:4000";
  axios.defaults.withCredentials = true;

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
        <Route exact path="/" element={<Wwe />} />
          <Route path="/solve/:id" element={<SolveQuestionPage />} />
          
          </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;
