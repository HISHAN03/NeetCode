import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style/SolveQuestionPage.css";
import Navbar from "./components/navbar";
const SolveQuestionPage = () => {
  const { id } = useParams();
  const [question, setQuestion] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [output, setOutput] = useState(null); // New state for the output

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

  const handleSubmit = (e) => {s
    e.preventDefault();
    axios
      .post(`/questions/${id}/check`, { answer: userAnswer }) // Send the answer in the request body
      .then((response) => {
        //console.log(answer);
        setOutput(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <>
    <Navbar />
    <div className="solve-question-page">
      {question ? (
        <div className="question-container">
          <h2 className="question-title">{question.title}</h2>
          <p className="question-description">{question.description}</p>
          <form className="answer-form" onSubmit={handleSubmit}>
            <label htmlFor="answer">Your Answer:</label>
            <textarea
              id="answer"
              value={userAnswer}
              onChange={handleAnswerChange}
              className="answer-textarea" 
              ></textarea>
            <button type="submit" className="submit-button">Submit Answer</button> 
          </form>
          {output && (
            <div className="output-section">
              <h3>Output:</h3>
              <p>{output}</p>
            </div>
          )}
        </div>
      ) : (
        <p>Loading question...</p>
        )}
    </div>
        </>
  );
};

export default SolveQuestionPage;
