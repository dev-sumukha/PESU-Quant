import React, { useState } from "react";

const QuestionCard = () => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto my-4">
      <h3 className="text-lg font-semibold mb-4">
        Question 1: What is the capital of France?
      </h3>
      <div className="space-y-2">
        {["Paris", "Berlin", "Madrid", "Rome"].map((option) => (
          <div
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
              selectedOption === option
                ? "bg-blue-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <span
              className={`inline-block w-4 h-4 mr-3 rounded-full border-2 ${
                selectedOption === option
                  ? "bg-blue-500 border-blue-500"
                  : "border-gray-400"
              }`}
            ></span>
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;