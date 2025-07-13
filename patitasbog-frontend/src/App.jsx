import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import Layout from './views/Layout';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './contexts/AuthContext';
import ViewHome from './views/Home/ViewHome';
import ViewSignUp from './views/Register/ViewSignUp';
import ViewLogin from './views/Login/ViewLogin';
import ConnTest from "./views/conn-test/conn-test";

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <Router>
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Layout><ViewHome /></Layout>} />
        <Route path="/register" element={<ViewSignUp />} />
        <Route path="/login" element={<ViewLogin />} />
        {/* Protegidas */}
        
      </Routes>
    </Router>
  );
}

export default App;
