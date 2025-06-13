// API Service para comunicación con el backend
class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
    this.token = localStorage.getItem('authToken');
  }

  // Configurar headers por defecto
  getHeaders(includeAuth = false) {
    const headers = {
      'Content-Type': 'application/json',
    };

    if (includeAuth && this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    return headers;
  }

  // Manejar respuestas de la API
  async handleResponse(response) {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error en la petición');
    }
    
    return data;
  }

  // 🔐 AUTENTICACIÓN
  
  // Iniciar sesión
  async login(email, password) {
    try {
      const response = await fetch(`${this.baseURL}/auth/login`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email, password })
      });

      const data = await this.handleResponse(response);
      
      // Guardar token en localStorage
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        this.token = data.token;
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Error al iniciar sesión');
    }
  }

  // Registrar usuario
  async register(fullName, email, password) {
    try {
      const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ fullName, email, password })
      });

      const data = await this.handleResponse(response);
      
      // Guardar token si viene en el registro
      if (data.token) {
        localStorage.setItem('authToken', data.token);
        this.token = data.token;
      }
      
      return data;
    } catch (error) {
      throw new Error(error.message || 'Error al registrar usuario');
    }
  }

  // Solicitar restablecimiento de contraseña
  async forgotPassword(email) {
    try {
      const response = await fetch(`${this.baseURL}/auth/forgot-password`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ email })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Error al solicitar restablecimiento');
    }
  }

  // Verificar token de restablecimiento
  async verifyResetToken(token) {
    try {
      const response = await fetch(`${this.baseURL}/auth/verify-token`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ token })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Token inválido o expirado');
    }
  }

  // Restablecer contraseña
  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${this.baseURL}/auth/reset-password`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({ token, password: newPassword })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Error al restablecer contraseña');
    }
  }

  // 👤 PERFIL

  // Obtener perfil del usuario
  async getProfile() {
    try {
      const response = await fetch(`${this.baseURL}/profile/`, {
        method: 'GET',
        headers: this.getHeaders(true)
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Error al obtener perfil');
    }
  }

  // Actualizar perfil
  async updateProfile(profileData) {
    try {
      const response = await fetch(`${this.baseURL}/profile/`, {
        method: 'PUT',
        headers: this.getHeaders(true),
        body: JSON.stringify(profileData)
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar perfil');
    }
  }

  // Cambiar contraseña
  async changePassword(currentPassword, newPassword) {
    try {
      const response = await fetch(`${this.baseURL}/profile/password`, {
        method: 'PUT',
        headers: this.getHeaders(true),
        body: JSON.stringify({ currentPassword, newPassword })
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Error al cambiar contraseña');
    }
  }

  // Subir foto de perfil
  async uploadProfilePicture(file) {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch(`${this.baseURL}/profile/upload-picture`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.token}`
          // No incluir Content-Type para multipart/form-data
        },
        body: formData
      });

      return await this.handleResponse(response);
    } catch (error) {
      throw new Error(error.message || 'Error al subir imagen');
    }
  }

  // 🔒 UTILIDADES

  // Cerrar sesión
  logout() {
    localStorage.removeItem('authToken');
    this.token = null;
  }

  // Verificar si está autenticado
  isAuthenticated() {
    return !!this.token;
  }

  // Obtener token actual
  getToken() {
    return this.token;
  }

  // Actualizar token
  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }
}

// Exportar instancia única
const apiService = new ApiService();
export default apiService;
