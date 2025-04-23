import React, { useState, useEffect } from 'react';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const Quiz = ({ material }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

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

      console.log(data.questions);

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

  const handleAnswerSelect = (answer) => {
    if (showResult) return; // Prevent multiple selections
    setSelectedAnswer(answer);
    setShowResult(true);
    if (answer === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      setQuizCompleted(true);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setQuizCompleted(false);
  };

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

  if (quizCompleted) {
    return (
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white rounded-lg p-8 shadow-sm text-center">
          <h1 className="text-3xl font-bold mb-6">Quiz Completed!</h1>
          <div className="text-2xl font-semibold mb-8">
            Your Score: {score}/{questions.length}
          </div>
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length * 100).toFixed(0);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Quiz Challenge</h1>
        <div className="text-lg font-semibold">
          Score: {score}/{questions.length}
        </div>
      </div>
      
      <div className="mb-4">
        <span className="text-gray-600">Question {currentQuestionIndex + 1} of {questions.length}</span>
        <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
          <div 
            className="bg-black h-2 rounded-full transition-all duration-300" 
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
                    ? 'bg-green-100 border-2 border-green-500'
                    : 'bg-red-100 border-2 border-red-500'
                  : 'bg-gray-50 hover:bg-gray-100 border border-gray-200'
              }`}
              disabled={showResult}
            >
              {option}
              {showResult && selectedAnswer === option && (
                <span className="float-right font-semibold">
                  {option === currentQuestion.correctAnswer ? '✓ Correct' : '✗ Incorrect'}
                </span>
              )}
            </button>
          ))}
        </div>

        {showResult && (
          <div className="mt-4 p-4 bg-gray-100 rounded-lg">
            <p className="font-medium">
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct! Well done!"
                : `The correct answer is: ${currentQuestion.correctAnswer}`}
            </p>
          </div>
        )}

        <div className="mt-6 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
              currentQuestionIndex === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-white border border-gray-300 hover:bg-gray-50'
            }`}
          >
            <ChevronLeft size={20} />
            Previous
          </button>
          
          <button
            onClick={handleNext}
            disabled={!showResult}
            className={`px-6 py-2 rounded-lg flex items-center gap-2 ${
              !showResult
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isLastQuestion ? 'Finish' : 'Next'}
            {!isLastQuestion && <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
