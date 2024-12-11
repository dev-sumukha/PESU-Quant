import React from "react";

const StudentList = () => {
  // Dummy data for students
  const students = [
    {
      fullname: "John Doe",
      username: "johndoe",
      email: "johndoe@example.com",
      scores: [85, 90, 75],
    },
    {
      fullname: "Jane Smith",
      username: "janesmith",
      email: "janesmith@example.com",
      scores: [92, 88, 91],
    },
    {
      fullname: "Michael Brown",
      username: "michaelbrown",
      email: "michaelbrown@example.com",
      scores: [78, 84, 80],
    },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Student List</h1>

      <ul className="space-y-4">
        {students.map((student, index) => (
          <li
            key={index}
            className="bg-white shadow-md rounded-lg p-6 border border-gray-200"
          >
            <h2 className="text-xl font-semibold mb-2">
              Full Name: {student.fullname}
            </h2>
            <p className="text-gray-700 mb-1">
              Username: <span className="font-semibold">{student.username}</span>
            </p>
            <p className="text-gray-700 mb-1">
              Email: <span className="font-semibold">{student.email}</span>
            </p>
            <div className="text-gray-700 mb-1">
              Scores:{" "}
              <ul className="list-disc list-inside">
                {student.scores.map((score, index) => (
                  <li key={index}>Test {index + 1}: {score}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentList;