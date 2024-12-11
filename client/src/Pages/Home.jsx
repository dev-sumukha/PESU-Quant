import React from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-gradient-to-br from-blue-300 to-indigo-500 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center text-white py-32 md:py-48 relative">
        <div className="absolute inset-0 bg-fixed bg-cover bg-no-repeat opacity-50"
          style={{
            backgroundImage: "url('/images/quiz-background.jpg')", // You can add a suitable background image here
            backgroundPosition: "center",
          }}
        ></div>
        <h1 className="relative text-6xl font-extrabold mb-6 z-20">
          Empower Your Learning
        </h1>
        <p className="relative text-2xl max-w-2xl mx-auto mb-8 z-20">
          The simple platform for quiz management and student performance
          tracking, designed to take your learning to the next level.
        </p>
        <NavLink
          to="/register"
          className="relative bg-white text-[#2563EA] font-bold px-8 py-4 rounded-full shadow-xl hover:bg-gray-100 hover:-translate-y-2 transition-transform transform duration-300 ease-in-out z-20"
        >
          Join Now
        </NavLink>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-[#2563EA] mb-16">
            Why PESU Quant?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 cursor-pointer">
            {/* Feature 1 */}
            <div className="group bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:bg-blue-50 transition-shadow transform hover:-translate-y-2 duration-300">
              <div className="bg-[#2563EA] p-5 rounded-full inline-block mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a3 3 0 003.22 0L21 8M5 10l7.55 5.03a3 3 0 003.32 0L21 10"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2563EA] mb-3">
                Easy to Use
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                Intuitive design that makes creating and participating in quizzes
                effortless.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="group bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:bg-blue-50 transition-shadow transform hover:-translate-y-2 duration-300">
              <div className="bg-[#2563EA] p-5 rounded-full inline-block mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 11c0 .933-.39 1.847-1.125 2.575C10.03 14.47 8.974 15 7.5 15S4.97 14.47 4.125 13.575A3.982 3.982 0 013 11c0-.933.39-1.847 1.125-2.575C4.97 7.53 6.026 7 7.5 7s2.53.53 3.375 1.425C11.61 9.153 12 10.067 12 11zm9 0c0 .933-.39 1.847-1.125 2.575C19.03 14.47 17.974 15 16.5 15s-2.53-.53-3.375-1.425C12.39 12.847 12 11.933 12 11c0-.933.39-1.847 1.125-2.575C13.97 7.53 15.026 7 16.5 7s2.53.53 3.375 1.425C20.61 9.153 21 10.067 21 11z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2563EA] mb-3">
                Secure & Reliable
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                Advanced security ensures your data is safe and quizzes are
                highly reliable.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="group bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-2xl hover:bg-blue-50 transition-shadow transform hover:-translate-y-2 duration-300">
              <div className="bg-[#2563EA] p-5 rounded-full inline-block mb-6 shadow-lg">
                <svg
                  className="w-10 h-10 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6 2H6l-3 2m3-2V5l3-2h8l3 2v7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#2563EA] mb-3">
                Track Performance
              </h3>
              <p className="text-gray-600 group-hover:text-gray-800 transition-colors duration-300">
                Gain real-time insights into student performance and progress.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#1D4ED8] py-20 text-center text-white">
        <h2 className="text-4xl font-extrabold mb-6">Get Started Today!</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Join PESU Quant to streamline your quiz management and take your
          academic journey to the next level.
        </p>
        <NavLink
          to="/register"
          className="bg-white text-[#2563EA] font-bold px-8 py-4 rounded-full shadow-xl hover:bg-gray-100 hover:-translate-y-2 transition-transform transform duration-300 ease-in-out"
        >
          Sign Up Now
        </NavLink>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E40AF] text-white py-6">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 PESU Quant. All rights reserved.</p>
          <a
            href="/terms"
            className="text-gray-400 hover:text-gray-200 transition-colors"
          >
            Terms & Conditions
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Home;