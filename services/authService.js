import $api from '@/http'

export default class AuthService {
  static refresh () {
    return $api.get('api/auth/refresh')
  }

  static registration (login, email, password) {
    return $api.post('api/auth/register', { login, email, password })
  }

  static login (login, password) {
    return $api.post('api/auth/login', { login, password })
  }

  static logout () {
    return $api.post('api/auth/logout')
  }

  static async verifyEmail (email) {
    return $api.post('api/auth/verify', { email })
  }

  static async getUpdatedEmailVerificationStatus (token) {
    return $api.post(`/api/auth/verify/${token}`)
  }

  static async resetPassword (email) {
    return $api.post('/api/auth/password-reset', { email })
  }

  static async changePassword (token, newPassword) {
    return $api.post(`/api/auth/password-reset/${token}`, { token, newPassword })
  }
}
