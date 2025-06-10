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
            <></> {/*Vista Home*/}
          </Layout>
        } />
        <Route path="/login" element={
          <Layout>
            <></> {/*Vista Login*/}
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <></> {/*Vista Register*/}
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;