import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContex';
import Navbar from './components/navbar';
import { Link } from 'react-router-dom';
import '../style/home.css';

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

  const deleteQuestion = async (questionId) => {
    try {
      await axios.get(`/delete-question/${questionId}`);
      fetchQuestions(); // Fetch questions again after deletion
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <>
      <Navbar />

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-5">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl mb-5">Questions</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {questions.length ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="question-box bg-white rounded-lg shadow px-5 py-6 sm:px-6 border border-gray-200 p-4 mb-4"
              >
                <h5 className="text-lg font-medium text-gray-900 mb-2">{question.title}</h5>
                <p className="mt-2 text-base text-gray-500 mb-4">{question.description}</p>
                <Link
                  to={`/solve/${question._id}`}
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Solve this question
                </Link>
                <button
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => deleteQuestion(question._id)}
                >
                  Delete
                </button>
                <Link
                  to={`/edit/${question._id}`}
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Edit
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
