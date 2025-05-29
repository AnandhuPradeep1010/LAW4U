import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Main from "./components/Main/Main";
import Topics from "./components/Topics/Topics";
import Education from "./components/Education/Education";
import Protection from "./components/Protection/Protection";
import Survival from "./components/Survival/Survival";
import Login from "./components/Login/Login"; // Add Login Page
import Signup from "./components/Signup/Signup"; // Add SignUp Page
import GamePage from "./components/GameOne/MatchGame";
import GameTwo from "./components/GameTwo/GameTwo"; // Add this
import GameThree from "./components/GameThree/GameThree";
import Stats from './components/Stats/Stats';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Header />  {/* Header will stay static */}
      
      <div className="content">  
        <Routes>
          <Route path="/" element={<><Main /><Topics /></>} /> {/* Home: Main + Topics */}
          <Route path="/topics" element={<Topics />} />
          <Route path="/education" element={<Education />} />
          <Route path="/protection" element={<Protection />} />
          <Route path="/survival" element={<Survival />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/match-the-right" element={<PrivateRoute><GamePage /></PrivateRoute>} />
          <Route path="/rights-quest" element={<PrivateRoute><GameTwo /></PrivateRoute>} />
          <Route path="/survival/game" element={<PrivateRoute><GameThree /></PrivateRoute>} />
        </Routes>
      </div>

      <Footer />  {/* Footer will stay static */}
    </Router>
  );
}

export default App;
