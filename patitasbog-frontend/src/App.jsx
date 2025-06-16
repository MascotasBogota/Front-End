import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; 
import Layout from './components/Principal/Layout';
import ViewRecuperarClave from './views/Login/ViewRecuperarClave';
import ViewCambiarClave from './views/Login/ViewCambiarClave';
import ViewCambiarClaveLogued from './views/Login/ViewCambiarClaveLogued';
import ViewPerfil from './views/Login/ViewPerfil';
import ViewEditarPerfil from './views/Login/ViewEditarPerfil';
import ViewCrearPerdida from './views/Reportes/ViewCrearPerdida';
import ViewEditarPerdida from './views/Reportes/ViewEditarPerdida';
import ViewCrearAvistamiento from './views/Reportes/ViewCrearAvistamiento';
import ViewEditarAvistamiento from './views/Reportes/ViewEditarAvistamiento';
import ViewLogin from './views/Login/ViewLogin';
import ViewRegistro from './views/Login/ViewRegistro'; // Cambiado de ViewRegistroTemp a ViewRegistro
import ViewHomeLogin from './views/Home/ViewHomeLogin';
import './index.css'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <Layout>
            <></> {/*Vista Home sin loguear*/}
          </Layout>
          
        } />
        <Route path="/home" element={
          <Layout>
           <ViewHomeLogin /> {/*Vista Home logueado*/}
          </Layout>
          
        } />
        <Route path="/login" element={
          <Layout>
            <ViewLogin /> {/*Vista Login*/}
          </Layout>
        } />
        <Route path="/register" element={
          <Layout>
            <ViewRegistro /> {/* Cambiado de ViewRegistroTemp a ViewRegistro */}
          </Layout>
        } />
        <Route path="/recover_password_request" element={
          <Layout>
            <ViewRecuperarClave />
          </Layout>
        } />
        <Route path="/change_password" element={
          <Layout>
            <ViewCambiarClave />
          </Layout>
        } />
        <Route path="/education" element={
          <Layout>
            <></> {/*Vista Módulo Educativo*/}
          </Layout>
        } />
        <Route path="/notifications" element={
          <Layout>
            <></> {/*Vista Notificaciones*/}
          </Layout>
        } />
        <Route path="/my_profile" element={
          <Layout>
            <ViewPerfil />
          </Layout>
        } />
        <Route path="/my_profile/picture" element={
          <Layout>
             <></> {/*Vista Subir Foto*/}
          </Layout>
        } />
        <Route path="/my_profile/edit" element={
          <Layout>
             <ViewEditarPerfil />
          </Layout>
        } />
        <Route path="/my_profile/change_password" element={
          <Layout>
            <ViewCambiarClaveLogued />
          </Layout>
        } />
        <Route path="/create_lost" element={
          <Layout>
            <ViewCrearPerdida />
          </Layout>
        } />
        <Route path="/edit_lost" element={
          <Layout>
            <ViewEditarPerdida />
          </Layout>
        } />
        <Route path="/create_seen" element={
          <Layout>
            <ViewCrearAvistamiento />
          </Layout>
        } />
        <Route path="/edit_seen" element={
          <Layout>
            <ViewEditarAvistamiento />
          </Layout>
        } />
      </Routes>
    </Router>
  );
}

export default App;