import React, { useState } from "react";

const SentimentAnalysisInput = ({ onSubmit }) => {
  const [inputText, setInputText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(inputText);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <div className="flex flex-col space-y-4">
        <textarea
          className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows="4"
          placeholder="Enter text for sentiment analysis..."
          value={inputText}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Analyse
        </button>
      </div>
    </form>
  );
};

const SentimentAnalysisPage = () => {
  const handleAnalysisSubmit = async (text) => {
    const response = await fetch("http://localhost:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
        });

    const data = await response.json();
    console.log(data);
    
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Sentiment Analysis
        </h1>
        <SentimentAnalysisInput onSubmit={handleAnalysisSubmit} />
      </div>
    </div>
  );
};

export default SentimentAnalysisPage;