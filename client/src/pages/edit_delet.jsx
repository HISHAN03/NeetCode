import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContex';
import Navbar from './components/navbar';
import { Link, useNavigate } from 'react-router-dom';
import '../style/home.css';

const Home = () => {
  const [questions, setQuestions] = useState([]);
  const { Username } = useContext(UserContext);
  const navigate = useNavigate();

  const editQuestion = async (questionId) => {
    try {
      const response = await axios.get(`/questions/${questionId}`);
      const editedQuestion = response.data;
      console.log(editedQuestion);
      redirectToAddQuestion(editedQuestion);
    } catch (error) {
      console.log(error);
    }
  };

  const redirectToAddQuestion = (question) => {
    console.log(question);
    navigate('/add_questions', { state: { question: question } });
  };

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
 


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {questions.length ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="question-box bg-white rounded-lg shadow px-5 py-6 sm:px-6 border border-gray-200 p-4 mb-4"
              >
                <h5 className="text-lg font-medium text-gray-900 mb-2">{question.title}</h5>
                <p className="mt-2 text-base text-gray-500 mb-4">{question.description}</p>

                <button
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  onClick={() => deleteQuestion(question._id)}
                >
                  Delete
                </button>
                <button
                  className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                  onClick={() => editQuestion(question._id)}
                >
                  Edit
                </button>
              </div>
              
            ))
          ) : (
            <p className="text-center">No questions found.</p>
          )}
      <div className="col-span-3 flex justify-center">
        <button
          className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-800 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Link to={`/add_questions`} className="text-lg font-extrabold tracking-tight text-white sm:text-xl">
            ADD-Questions
          </Link>
        </button>
      </div>
    </div>
  </div>
    </>
  );
};

export default Home;
