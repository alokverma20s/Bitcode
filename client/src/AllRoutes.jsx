import React from 'react'
import {Routes, Route} from 'react-router-dom';


import CodeEditor from './Pages/Compiler/CodeEditor';
import { ChakraProvider } from '@chakra-ui/react';
import Contest from './Pages/Contest/Contest';
import CreateContest from './Pages/Contest/CreateContest';
import EditContest from './Pages/Contest/EditContest';
import AddProblem from './Pages/Contest/AddProblem';
import ContestPage from './Pages/Contest/ContestPage';
import Leaderboard from './Pages/Contest/Leaderboard';
import Home from './Pages/Home';

const AllRoutes = () => {
  return (
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/contest' element={<Contest/>}></Route>
        <Route path='/contest/createContest' element={<CreateContest/>}></Route>
        <Route path='/contest/editContest/:id' element={<EditContest/>}></Route>
        <Route path='/contest/addProblem' element={<AddProblem/>}></Route>
        <Route path='/contest/:id' element={<ContestPage/>}></Route>
        <Route path='/contest/:id/leaderboard' element={<Leaderboard/>}></Route>
        <Route path='/contest/:constestId/:problemId' element={
          <ChakraProvider>
            <CodeEditor />
          </ChakraProvider>
        }></Route>
    </Routes>
  )
}

export default AllRoutes