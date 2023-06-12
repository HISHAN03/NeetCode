import axios from 'axios';
import { useContext, useEffect, useState } from "react";
import { UserContext } from './UserContex';
import Navbar from './navbar';
import "./home.css"


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
    
    <div style={{ marginLeft: '20px', marginRight: '20px' }}>
      <div className="container mx-auto my-5">
        <h1 className="text-center mb-5">Questions</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {questions.length ? (
            questions.map((question) => (
              <div
                key={question._id}
                className="question-box bg-transparent border border-black rounded-lg p-4 mb-4"
              >
                <h5 className="text-xl font-semibold mb-2">{question.title}</h5>
                <p className="mb-4">{question.description}</p>
                <p className="mb-2">
                  <strong>Output:</strong> {question.output}
                </p>
                <a
                  href={`solve/${question._id}`}
                  className="block text-center bg-transparent border border-black text-black hover:bg-black hover:text-white px-4 py-2 rounded transition-colors duration-300"
                >
                  Solve this question
                </a>
              </div>
            ))
          ) : (
            <p className="text-center">No questions found.</p>
          )}
        </div>
      </div>
    </div>
  </>
  );
};

export default Home;
