import React from 'react';
import './App.css';
import { Route, Routes } from "react-router-dom";
import TaskList from "./pages/TaskList";

function App() {

  return (
    <Routes>
      <Route path='/' element={<TaskList />} />
    </Routes>
  );
}

export default App;
