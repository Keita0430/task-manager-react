import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";
import Container from '@mui/material/Container';

function App() {

  return (
    <Container>
      <Routes>
        <Route path='/' element={<TaskList />} />
      </Routes>
    </Container>
  );
}

export default App;
