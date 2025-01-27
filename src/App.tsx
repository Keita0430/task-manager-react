import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import Container from '@mui/material/Container';
import TaskEdit from "./pages/TaskEdit";

function App() {

  return (
    <Container>
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/tasks/new' element={<TaskCreate />} />
        <Route path='/tasks/edit' element={<TaskEdit />} />
      </Routes>
    </Container>
  );
}

export default App;
