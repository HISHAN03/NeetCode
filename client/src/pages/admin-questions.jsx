import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AddQuestionPage = () => {
  const location = useLocation();
  const question = location.state?.question;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [output, setOutput] = useState('');

  useEffect(() => {
    if (question) {
      setTitle(question.title || '');
      setDescription(question.description || '');
      setOutput(question.output || '');
    }
  }, [question]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/add-question', {
        title,
        description,
        output
      });

      setTitle('');
      setDescription('');
      setOutput('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">Add Question</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            ></textarea>
          </div>
          <div className="mb-4">
            <label htmlFor="output" className="block text-gray-700 font-semibold mb-2">
              Output
            </label>
            <textarea
              name="output"
              id="output"
              rows="3"
              placeholder="Enter output"
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              className="w-full border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:border-blue-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
          >
            Add Question
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddQuestionPage;
