import React, { useState, useEffect } from 'react';

const Quiz = ({ material }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);

  const url = import.meta.env.VITE_PYTHON_BACKEND_URL;

  const getQuiz = async () => {
    try {
      console.log('Fetching quiz...');
      const response = await fetch(`${url}/quiz`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: material }),
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch quiz: ${response.status}`);
      }

      const data = await response.json();
      console.log('Quiz data received:', data);

      if (!data.questions || !Array.isArray(data.questions)) {
        throw new Error('Invalid quiz data format');
      }

      setQuestions(data.questions);
      setError(null);
    } catch (error) {
      console.error('Error fetching quiz:', error);
      setError(error.message);
    }
  };

  useEffect(() => {
    if (material) {
      getQuiz();
    }
  }, [material]);

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-600">Loading quiz...</div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length * 100).toFixed(0);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleNext = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handlePrevious = () => {
    setCurrentQuestionIndex(prev => prev - 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Quiz Challenge</h1>
      
      <div className="mb-4">
        <span className="text-gray-600">Quiz {currentQuestionIndex + 1} of {questions.length}</span>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-black h-2 rounded-full" 
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="text-gray-600 float-right">{progress}% Complete</span>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full p-4 text-left rounded-lg transition-colors ${
                selectedAnswer === option
                  ? option === currentQuestion.correctAnswer
                    ? 'bg-green-100 border border-green-500'
                    : 'bg-red-100 border border-red-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
              disabled={showResult}
            >
              {option}
              {showResult && selectedAnswer === option && (
                <span className="float-right">
                  {option === currentQuestion.correctAnswer ? 
                    '✓ Correct' : 
                    'X Incorrect'
                  }
                </span>
              )}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p>The correct answer is: {currentQuestion.correctAnswer}</p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-500'
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={currentQuestionIndex === questions.length - 1 || !showResult}
            className={`px-6 py-2 rounded-lg ${
              currentQuestionIndex === questions.length - 1 || !showResult
                ? 'bg-gray-200 text-gray-500'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;