# 🐾 FrontEnd: Interfaz de Usuario PatitasBog

Este módulo corresponde a la interfaz de usuario de **PatitasBog** una plataforma colaborativa diseñada para ayudar a reunir mascotas con sus familias. A través de este frontend, los usuarios pueden interactuar con la aplicación de forma intuitiva y accesible desde el navegador. Permite visualizar publicaciones, registrar reportes y consultar información, realizando llamadas a las APIs que forman parte del ecosistema del proyecto. Su diseño se centra en la experiencia del usuario, facilitando la comunicación fluida con los servicios del backend.

---

## Requisitos Previos

- Node.js 
- npm

---

## 🧠 Función principal 

El propósito principal de este frontend es servir como punto de acceso para los usuarios finales, permitiéndoles interactuar con las funcionalidades clave de la plataforma PatitasBog. A través de esta interfaz, se gestionan las búsquedas, reportes y visualizaciones de mascotas, así como otras acciones relacionadas, mediante peticiones HTTP al backend. El sistema está desarrollado con React y Vite, y sigue una arquitectura orientada a servicios (SOFEA), lo que garantiza modularidad, escalabilidad y una experiencia de usuario rápida y fluida.

---

## 📁 Estructura del Proyecto

```
Front-End/
├── README.md
├── CHANGELOG.md
├── Documentacion/
└── patitasbog-frontend/
    ├── Dockerfile
    ├── public/
    │   ├── icons/
    │   └── images/
    ├── src/
    │   ├── componentes/
    │   │   ├── Education/
    │   │   ├── Home/
    │   │   ├── Login/
    │   │   ├── Notificaciones/
    │   │   ├── Principal/
    │   │   ├── Profile/
    │   │   ├── Register/
    │   │   ├── Reportes/
    │   │   └── PrivateRoute.jsx
    │   ├── contexts/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   ├── apiService.js
    │   │   ├── imageService.js
    │   │   ├── notificationService.js
    │   │   ├── reportService.js
    │   │   ├── reputationService.js
    │   │   ├── responseService.js
    │   │   └── userService.js
    │   ├── styles/
    │   ├── views/
    │   │   ├── conn-test/
    │   │   ├── Education/
    │   │   ├── Home/
    │   │   ├── Login/
    │   │   ├── Notifications/
    │   │   ├── Profile/
    │   │   ├── Register/
    │   │   ├── Reports/
    │   │   └── Layout.jsx
    │   ├── App.css
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── index.html
    ├── .env
    ├── .gitignore
    ├── package.json
    ├── package-lock.json
    └── vite.config.js



```

---

## 🚀 Setup del Entorno

### 1. Clonar repositorio

```bash
git clone https://github.com/MascotasBogota/Front-End.git
cd Front-End
cd patitasbog-frontend
```

### 2. Instalación de dependencias

```bash
npm install
```

### 3. Ejecutar la interfaz de usuario

```bash
npm run dev
```

---

## 🐋 Uso con Docker

Si prefieres contenedores:

```bash
docker compose up
```

---

¿Dudas o sugerencias? Contacta al equipo de frontend 😺