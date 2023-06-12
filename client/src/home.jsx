import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { UserContext } from './UserContex';
import Navbar from './navbar';
const Home = () => {
  const [questions, setQuestions] = useState([]);
  const { Username, Id, setId, setUsername } = useContext(UserContext);

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
    <div className="container my-5">
      <h1 className="text-center mb-5">Questions</h1>
      <div className="grid grid-cols-2 gap-4">
        {/* Left Column */}
        <div className="col-span-2 md:col-span-1">
          {questions.length ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="bg-white bg-opacity-30 rounded-md p-4 mb-4"
              >
                <h5 className="text-xl font-semibold mb-2">{question.title}</h5>
                <p className="mb-4">{question.description}</p>
                <p className="mb-2">
                  <strong>Output:</strong> {question.output}
                </p>
                <a
                  href={`solve/${question._id}`}
                  className="block text-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Solve this question
                </a>
              </div>
            ))
          ) : (
            <p className="text-center">No questions found.</p>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-2 md:col-span-1">
          <div className="bg-gradient-to-b from-purple-400 to-blue-500 rounded-md p-4 mb-4">
            <h5 className="text-xl font-semibold mb-2 text-white">User Info</h5>
            <p className="text-white">
              Name: {Username}
            </p>
            {/* Render additional user information */}
            <p className="text-white">
              
            </p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
