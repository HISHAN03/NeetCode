import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContex';
import Navbar from './navbar';
import { Link } from 'react-router-dom';
import './home.css';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const { Username } = useContext(UserContext);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('/questions');
      setQuestions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Navbar />

      <div className="container mx-auto my-5">
        <h1 className="text-center mb-5">Questions</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {questions.length ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="question-box bg-white border border-gray-200 rounded-lg p-4 mb-4 shadow"
              >
                <h5 className="text-xl font-semibold mb-2">{question.title}</h5>
                <p className="mb-4">{question.description}</p>
                <Link
                  to={`/solve/${question._id}`}
                  className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Solve this question
                </Link>
              </div>
            ))
          ) : (
            <p className="text-center">No questions found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
