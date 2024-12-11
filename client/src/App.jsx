import React from "react";
import Navbar from "./components/Navbar";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import StudentProfile from "./Pages/Profile";
import Quizzes from "./Pages/Quizzes";
import AddQuestion from "./Pages/AddQuestion";
import StudetnList from "./Pages/StudentList";
import StudentList from "./Pages/StudentList";
import Logout from "./Pages/Logout";
// #2563EA #FEFFFE #09090B


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/profile" element={<StudentProfile />} />
          <Route path="/quizzes" element={<Quizzes />}/>
          <Route path="/add_question" element={<AddQuestion />}/>
          <Route path="/students" element={<StudentList />}/>
          <Route path="/logout" element={<Logout />}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App