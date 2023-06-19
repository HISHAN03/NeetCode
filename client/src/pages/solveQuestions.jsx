import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/navbar";

const SolveQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [output, setOutput] = useState(null);

  useEffect(() => {
    fetchQuestion();
  }, []);

  const fetchQuestion = async () => {
    try {
      const response = await axios.get(`/questions/${id}`);
      setQuestion(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAnswerChange = (e) => {
    setUserAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`/questions/${id}/check`, { answer: userAnswer })
      .then((response) => {
        setOutput(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {question ? (
            <div className="bg-white p-6 rounded shadow-md">
              <p className="text-2xl font-semibold text-center text-gray-800 mb-4 mt-4">
                {question.description}
              </p>
              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                <div className="border-2 border-black p-4 rounded">
                  <label htmlFor="answer" className="font-medium text-gray-700">
                    Your Answer:
                  </label>
                  <textarea
                    id="answer"
                    value={userAnswer}
                    onChange={handleAnswerChange}
                    className="mt-1 block w-full rounded-md border-none font-bold shadow-sm focus:border-blue focus:ring-white-500"
                    rows="5"
                    placeholder="  Submit your answer here"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Submit Answer
                </button>
              </form>
              {output && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-gray-800">Output:</h3>
                  <p className={`mt-2 ${output === "correct" ? "text-green-600" : "text-red-600"}`}>
                    {output}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-center">Loading question...</p>
          )}
        </div>
      </div>
    </>
  );
};

export default SolveQuestionPage;
