import {BrowserRouter as Router} from 'react-router-dom';
import {useEffect} from 'react'
import './App.css';

import React from 'react';
import AllRoutes from './AllRoutes';
function App() {

  return (
    <div className="App">
      <Router>
        {/* <Navbar></Navbar> */}
        <AllRoutes></AllRoutes>
      </Router>
    </div>
  );
}

export default App;
