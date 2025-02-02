import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskCreate from "./pages/TaskCreate";
import Container from '@mui/material/Container';
import TaskEdit from "./pages/TaskEdit";
import ArchivedTaskList from "./pages/ArchivedTaskList";

function App() {

  return (
    <Container>
      <Routes>
        <Route path='/' element={<TaskList />} />
        <Route path='/tasks/new' element={<TaskCreate />} />
        <Route path='/tasks/edit' element={<TaskEdit />} />
        <Route path='/tasks/archived' element={<ArchivedTaskList />} />
      </Routes>
    </Container>
  );
}

export default App;
