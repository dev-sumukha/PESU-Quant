import React from "react";

const Profile = ({ student }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100">
      {/* Profile Section */}
      <div className="container mx-auto p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 max-w-4xl mx-auto mt-24">
          <div className="flex items-center space-x-6">
            {/* Profile Image */}
            <div className="flex-shrink-0">
              <img
                src={student?.profilePic || "https://via.placeholder.com/150"}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover shadow-md"
              />
            </div>
            {/* Student Information */}
            <div className="text-gray-700">
              <h2 className="text-3xl font-bold">{student?.fullName || "Full Name"}</h2>
              <p className="text-gray-600 mt-2 text-lg">@{student?.username || "Username"}</p>
              <p className="text-gray-500 mt-2">{student?.email || "email@example.com"}</p>
              <p className="text-gray-600 mt-6">
                <span className="font-semibold">Total Quizzes:</span> {student?.scores?.length || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Scores Section */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">Quiz Scores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {student?.scores?.length > 0 ? (
              student.scores.map((quiz, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg p-6 border-l-4 border-[#2563EA] transform transition duration-300 hover:scale-105"
                >
                  <p className="font-bold text-gray-800">Quiz {index + 1}</p>
                  <p className="text-gray-500 mt-2">
                    <span className="font-semibold">Score:</span> {quiz.score || 0}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-600">No quiz scores available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;