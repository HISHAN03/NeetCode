import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { UserContext } from './UserContex';
import Navbar from './components/navbar';
import { Link } from 'react-router-dom';
import '../style/home.css';
import Footer from './components/footer'
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

      <div className="container max-w-8xl mx-auto px-1 sm:px-4 md:px-4 lg:px-8 my-4">
        <h1 className="text-center text-3xl font-extrabold tracking-tight text-blue-900 md:text-4xl mt-8 mb-8">
          <span className="bg-gray-200 px-4 py-2 rounded-lg mt-4 mb-4">Questions</span>
        </h1>

        <div className="grid grid-cols-1 gap-4">
          {questions.length ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="question-box bg-white rounded-lg shadow border border-gray-200 p-4 flex items-center space-x-4"
              >
                <h5 className="flex-grow-0 text-lg font-medium text-gray-900">{question.title}</h5>
                <p className="flex-grow text-base text-gray-500">{question.description}</p>
                <div className="flex-none">
                  <Link
                    to={`/solve/${question._id}`}
                    className="inline-flex items-center justify-center px-3 py-1 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-900 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Solve
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No questions found.</p>
          )}
        </div>
      </div>

      <div className="footer-container h-10 bg-blue-500 fixed bottom-0 left-0 right-0">
    <Footer />
      </div>
    </>
  );
};

export default Home;
