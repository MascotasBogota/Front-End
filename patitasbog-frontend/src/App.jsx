import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useContext } from 'react';
import './App.css';
import Layout from './views/Layout';
import PrivateRoute from './components/PrivateRoute';
import { AuthContext } from './contexts/AuthContext';
import ViewHome from './views/Home/ViewHome';
import ViewHomeLogin from './views/Home/ViewHomeLogin';
import ViewSignUp from './views/Register/ViewSignUp';
import ViewLogin from './views/Login/ViewLogin';
import ViewRecoverPassword from './views/Login/ViewRecoverPassword';
import ConnTest from "./views/conn-test/conn-test";
import ReportForm from "./components/Reportes/ReportForm"
import { GoogleOAuthProvider } from '@react-oauth/google';

function App() {
  const { isAuthenticated } = useContext(AuthContext);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <Router>
        <Routes>
          {/* Públicas */}
          <Route path="/" element={<Layout><ViewHome /></Layout>} />
          <Route path="/register" element={<ViewSignUp />} />
          <Route path="/login" element={<ViewLogin />} />
          <Route path="/recover_password" element={<ViewRecoverPassword />} />
          
          {/* Protegidas */}
          <Route
            path="/home"
            element={
              <PrivateRoute><Layout><ViewHomeLogin /></Layout></PrivateRoute>
            }
          />
          <Route
            path="/create-report"
            element={
              <PrivateRoute>
                <Layout>
                  <ReportForm type="lost"/>
                </Layout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
