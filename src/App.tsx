import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './components/Nav';
import AdminPage from './pages/AdminPage';
import InputPage from './pages/InputPage';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path="/" element={<InputPage/>} />
        <Route path="/admin" element={<AdminPage/>} />
      </Routes>
    </div>
  );
}

export default App;
