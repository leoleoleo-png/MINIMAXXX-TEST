import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Bar from './Bar';
import Cognac from './Cognac';
import Conf from './Conf';
import Legal from './Legal';
import Error from './Error';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Bar" element={<Bar />} />
        <Route path="/Cognac" element={<Cognac />} />
        <Route path="/Conf" element={<Conf />} />
        <Route path="/Legal" element={<Legal />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
