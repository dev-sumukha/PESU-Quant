import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import toast from "react-hot-toast";
import UserContext from "../store/UserContext";

const AddQuestion = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [questionData, setQuestionData] = useState({
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  });

  // Initialize questionList to an empty array
  const [questionList, setQuestionList] = useState([]);
  const { token } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Check if the input name is for an option
    if (name.startsWith("option")) {
      const index = Number(name.split("-")[1]); // Extract the index from the input name
      const updatedOptions = [...questionData.options]; // Create a copy of the current options
      updatedOptions[index] = value; // Update the specific option based on its index
      setQuestionData({ ...questionData, options: updatedOptions }); // Update the state with new options
    } else {
      setQuestionData({ ...questionData, [name]: value }); // For question and correct answer, just update the state directly
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const { question, correctAnswer } = questionData;

    // Prepare options as an object
    const options = {
      option1: questionData.options[0],
      option2: questionData.options[1],
      option3: questionData.options[2],
      option4: questionData.options[3],
    };

    try {
      const res = await axios.post(
        'http://localhost:3000/api/question/admin/add_question',
        {
          question,
          options,
          correctAnswer
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res) {
        toast.success('Question created')
        console.log(res);
        setModalIsOpen(false)
        setQuestionData({
          question: "",
          options: ["", "", "", ""],
          correctAnswer: "",
        })
      } else {
        console.log(res);
      }
    } catch (error) {
      console.error('Error ', error.message)
      console.error('Error ', error)
    }
  };

  const fetchQuestionList = async () => {
    try {
      const questions = await axios.get('http://localhost:3000/api/question/admin/get_questions', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Log the entire response to check its structure
      // console.log(questions.data); // Check this to see the structure
      // console.log(questions?.data?.questionList);
      // console.log(questions?.data?.questionList[0].options);
      if (questions?.data && questions?.data?.questionList) {
        setQuestionList(questions?.data?.questionList);
      } else {
        console.error("Expected 'questionList' not found in response.");
      }
    } catch (error) {
      console.error('Error ', error.message);
    }
  }


  useEffect(() => {
    fetchQuestionList()
  }, [])


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Question Manager</h1>
      <button
        onClick={() => setModalIsOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Add Question
      </button>

      {modalIsOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-11/12 max-w-md">
            <h2 className="text-xl mb-4">Add a New Question</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-2">Question</label>
                <input
                  type="text"
                  name="question"
                  value={questionData.question}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                  autoComplete="off"
                />
              </div>
              {questionData.options.map((option, index) => (
                <div key={index} className="mb-4">
                  <label className="block mb-2">Option {index + 1}</label>
                  <input
                    type="text"
                    name={`option-${index}`}
                    value={option}
                    onChange={handleChange}
                    className="border p-2 rounded w-full"
                    required
                    autoComplete="off"
                  />
                </div>
              ))}
              <div className="mb-4">
                <label className="block mb-2">Correct Answer</label>
                <input
                  type="text"
                  name="correctAnswer"
                  value={questionData.correctAnswer}
                  onChange={handleChange}
                  className="border p-2 rounded w-full"
                  required
                  autoComplete="off"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setModalIsOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Question List</h2>
        {questionList.length === 0 ? (
          <p>No questions added yet.</p>
        ) : (
          <ul className="space-y-4">
            {questionList.map((q, index) => (
              <li key={index} className="border p-4 rounded-lg flex justify-between items-center">
                <div>
                  <h3 className="font-semibold">{`${index + 1}. ${q.question}`}</h3>
                  <ul className="mt-2 space-y-1">
                    {Object.keys(q.options).map((key, i) => (
                      <li key={i} className="text-gray-700">{`Option ${i + 1}: ${q.options[key]}`}</li>
                    ))}
                  </ul>
                  <p className="mt-2 text-green-600">{`Correct Answer: ${q.correctAnswer}`}</p>
                </div>
                <button
                  onClick={() => handleDelete(index, q._id)} // Ensure q has _id property
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>

        )}
      </div>
    </div>
  );
};

export default AddQuestion;
