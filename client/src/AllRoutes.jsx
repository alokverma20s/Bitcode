import React from 'react';
import { Routes, Route } from 'react-router-dom';
import CodeEditor from './Pages/Compiler/CodeEditor';
import { ChakraProvider } from '@chakra-ui/react';
import Contest from './Pages/Contest/Contest';
import CreateContest from './Pages/Contest/CreateContest';
import EditContest from './Pages/Contest/EditContest';
import AddProblem from './Pages/Contest/AddProblem';
import ContestPage from './Pages/Contest/ContestPage';
import Leaderboard from './Pages/Contest/Leaderboard';
import Home from './Pages/Home';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component

const AllRoutes = () => {
  // Simulating login status; you will have to manage this through context or state
  const user = JSON.parse(localStorage.getItem('userInfo'));
  const isLoggedIn = user ? true: false;// Set to true/false based on your auth logic


  return (
    <Routes>
      {/* Public Route */}
      <Route path='/' element={<Home />} />

      {/* Protected Routes */}
      <Route
        path='/contest'
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Contest />
          </ProtectedRoute>
        }
      />
      <Route
        path='/contest/createContest'
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <CreateContest />
          </ProtectedRoute>
        }
      />
      <Route
        path='/contest/editContest/:id'
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <EditContest />
          </ProtectedRoute>
        }
      />
      <Route
        path='/contest/addProblem'
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <AddProblem />
          </ProtectedRoute>
        }
      />
      <Route
        path='/contest/:id'
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ContestPage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/contest/:id/leaderboard'
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Leaderboard />
          </ProtectedRoute>
        }
      />
      <Route
        path='/contest/:contestId/:problemId'
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <ChakraProvider>
              <CodeEditor />
            </ChakraProvider>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AllRoutes;
