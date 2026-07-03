// src/services/authService.js
import api from './api'

class AuthService {
  /**
   * ✅ Login with email and password
   */
  async login(email, password) {
    try {
      const response = await api.post('/auth/login', { email, password })
      
      if (response.data.success) {
        // ✅ Store token and user data
        localStorage.setItem('authToken', response.data.data.token)
        localStorage.setItem('userId', response.data.data.userId)
        return response.data
      } else {
        throw new Error(response.data.message || 'Login failed')
      }
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  /**
   * ✅ Register new user
   */
  async register(data) {
    try {
      const response = await api.post('/auth/register', data)
      return response.data
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  /**
   * ✅ Logout
   */
  logout() {
    localStorage.removeItem('authToken')
    localStorage.removeItem('userId')
    window.location.href = '/login'
  }

  /**
   * ✅ Check if user is authenticated
   */
  isAuthenticated() {
    const token = localStorage.getItem('authToken')
    return !!token
  }

  /**
   * ✅ Get auth token
   */
  getToken() {
    return localStorage.getItem('authToken')
  }

  /**
   * ✅ Get userId
   */
  getUserId() {
    return localStorage.getItem('userId')
  }

  /**
   * ✅ Forgot password
   */
  async forgotPassword(email) {
    try {
      const response = await api.post('/auth/forgot-password', { email })
      return response.data
    } catch (error) {
      console.error('Forgot password error:', error)
      throw error
    }
  }

  /**
   * ✅ Reset password
   */
  async resetPassword(token, newPassword) {
    try {
      const response = await api.post('/auth/reset-password', { token, newPassword })
      return response.data
    } catch (error) {
      console.error('Reset password error:', error)
      throw error
    }
  }
}

export default new AuthService()