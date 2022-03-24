import './App.min.css';
import { Fitness } from './page/fitness'
import { About } from './page/about'
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from './components/RequireAuth'
import { Login } from './page/login'
import { Logout } from './page/logout'
import { Signup } from './page/signup'
import React from "react";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<RequireAuth><Fitness /></RequireAuth>} />
        <Route path="about" element={<RequireAuth><About /></RequireAuth>} />
        <Route path="login" element={<Login />} />
        <Route path="logout" element={<Logout />} />
        <Route path="signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
