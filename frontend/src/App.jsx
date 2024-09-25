import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Menu from './components/Menu';
import Login from './components/Login';
import Profile from './components/Profile'
import History from './components/History'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
};

export default App;
