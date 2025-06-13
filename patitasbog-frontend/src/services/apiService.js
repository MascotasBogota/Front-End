const API_BASE_URL = 'http://localhost:5000/api';

class ApiService {
  // Configuración base para requests
  static async makeRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',  // ✅ Esto está correcto
        ...options.headers
      }
    };

    // Agregar token si está disponible
    const token = localStorage.getItem('authToken');
    if (token) {
      defaultOptions.headers.Authorization = `Bearer ${token}`;
    }

    try {
      console.log(`🌐 Making request to: ${url}`);
      console.log(`📤 Request method: ${options.method || 'GET'}`);
      console.log(`📋 Request headers:`, defaultOptions.headers);
      
      // AGREGAR DEBUG PARA VER QUÉ SE ESTÁ ENVIANDO
      if (options.body) {
        console.log(`📦 Request body:`, options.body);
        console.log(`📦 Request body type:`, typeof options.body);
      }
      
      const response = await fetch(url, { ...defaultOptions, ...options });
      
      console.log(`📊 Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }));
        throw new Error(errorData.message || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`❌ API Error for ${endpoint}:`, error);
      throw error;
    }
  }

  // AUTENTICACIÓN - RUTAS CORREGIDAS
  static async login(credentials) {
    return this.makeRequest('/users/login', {  // CORREGIDO: era /auth/login
      method: 'POST',
      body: JSON.stringify(credentials)
    });
  }

  static async register(userData) {
    return this.makeRequest('/users/register', {  // CORREGIDO: era /auth/register
      method: 'POST',
      body: JSON.stringify(userData)
    });
  }

  // RECUPERACIÓN DE CONTRASEÑA - RUTAS CORREGIDAS
  static async forgotPassword(email) {
    return this.makeRequest('/auth/forgot-password', {  // Esta SÍ está en /auth
      method: 'POST',
      body: JSON.stringify({ email })
    });
  }

  static async verifyResetToken(token) {
    return this.makeRequest('/auth/verify-token', {  // Esta SÍ está en /auth
      method: 'POST',
      body: JSON.stringify({ token })
    });
  }

  static async resetPassword(token, newPassword) {
    return this.makeRequest('/auth/reset-password', {  // Esta SÍ está en /auth
      method: 'POST',
      body: JSON.stringify({ token, newPassword })
    });
  }

  // PERFIL DE USUARIO
  static async getProfile() {
    return this.makeRequest('/profile/');
  }

  static async updateProfile(profileData) {
    return this.makeRequest('/profile/', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  }

  static async changePassword(passwordData) {
    return this.makeRequest('/profile/change-password', {
      method: 'POST',
      body: JSON.stringify(passwordData)
    });
  }

  // SUBIDA DE ARCHIVOS
  static async uploadProfilePicture(file) {
    const formData = new FormData();
    formData.append('file', file);

    return this.makeRequest('/profile/upload-picture', {
      method: 'POST',
      headers: {}, // Sin Content-Type para FormData
      body: formData
    });
  }

  // UTILIDADES
  static saveToken(token) {
    localStorage.setItem('authToken', token);
  }

  static getToken() {
    return localStorage.getItem('authToken');
  }

  static removeToken() {
    localStorage.removeItem('authToken');
  }

  static isAuthenticated() {
    return !!this.getToken();
  }
}

export default ApiService;
