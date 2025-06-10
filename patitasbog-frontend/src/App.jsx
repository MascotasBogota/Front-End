import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Layout from './components/Principal/Layout/Layout';
import './index.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <></> {/* Aquí iría el componente de tu vista principal */}
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <></> {/* Aquí iría el componente de tu vista de login */}
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <></> {/* Aquí iría el componente de tu vista de registro */}
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;