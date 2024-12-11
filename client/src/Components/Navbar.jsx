import React, { useContext, useState,useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import userContext from "../store/UserContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const { isAdmin, isLoggedIn, LogoutUser } = useContext(userContext);

  // Debugging
  // useEffect(() => {
  //   console.log('isAdmin:', isAdmin, 'isLoggedIn:', isLoggedIn);
  // }, [isAdmin, isLoggedIn]);

  const handleLogout = () => {
    navigate('/');
    LogoutUser();
  };

  if (isAdmin === undefined || isLoggedIn === undefined) {
    return <div>Loading...</div>; // Avoid rendering until values are available
  }

  return (
    <nav className="bg-[#2563EA] text-[#FEFFFE] p-4 w-full z-10">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">PESU Quant</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLink to="/" className="hover:text-gray-300">Home</NavLink>

          {isAdmin && isLoggedIn ? (
            <>
              <NavLink to="/add_question" className="hover:text-gray-300">Create Question</NavLink>
              <NavLink to="/students" className="hover:text-gray-300">Students</NavLink>
              <button onClick={handleLogout} className="bg-gray-200 text-[#09090B] px-4 py-2 rounded-lg hover:bg-gray-300">
                Logout
              </button>
            </>
          ) : (
            <>
              {isLoggedIn ? (
                <>
                  <NavLink to="/profile" className="hover:text-gray-300">Profile</NavLink>
                  <NavLink to="/quizzes" className="hover:text-gray-300">Quizzes</NavLink>
                  <button onClick={handleLogout} className="bg-gray-200 text-[#09090B] px-4 py-2 rounded-lg hover:bg-gray-300">
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-[#dfdfe083] text-white px-4 py-2 rounded-lg hover:bg-gray-700">
                    <NavLink to="/register">Register</NavLink>
                  </button>
                  <button className="bg-gray-200 text-[#09090B] px-4 py-2 rounded-lg hover:bg-gray-300">
                    <NavLink to="/login">Login</NavLink>
                  </button>
                </>
              )}
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden mt-4 space-y-2 text-center overflow-hidden transition-[max-height] duration-300 ease-in-out ${
          isOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <NavLink to="/" className="block hover:bg-[#09090B] p-2 rounded">Home</NavLink>
        {isAdmin && isLoggedIn ? (
          <>
            <NavLink to="/add_question" className="block hover:bg-[#09090B] p-2 rounded">Add Question</NavLink>
            <NavLink to="/students" className="block hover:bg-[#09090B] p-2 rounded">Students</NavLink>
            <button onClick={handleLogout} className="bg-gray-200 text-[#09090B] w-full py-2 rounded-lg hover:bg-gray-300">
              Logout
            </button>
          </>
        ) : (
          <>
            {isLoggedIn ? (
              <>
                <NavLink to="/profile" className="block hover:bg-[#09090B] p-2 rounded">Profile</NavLink>
                <NavLink to="/quizzes" className="block hover:bg-[#09090B] p-2 rounded">Quizzes</NavLink>
                <button onClick={handleLogout} className="bg-gray-200 text-[#09090B] w-full py-2 rounded-lg hover:bg-gray-300">
                  Logout
                </button>
              </>
            ) : (
              <>
                <button className="bg-[#dfdfe083] text-white w-full py-2 rounded-lg hover:bg-gray-700">
                  <NavLink to="/register">Register</NavLink>
                </button>
                <button className="bg-gray-200 text-[#09090B] w-full py-2 rounded-lg hover:bg-gray-300">
                  <NavLink to="/login">Login</NavLink>
                </button>
              </>
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

