import $api from '@/http'

export default class userService {
  static async updateUser (user, id) {
    return $api.patch(`api/users/${id}`, user)
  }

  static async uploadUserAvatar (userId, formData) {
    return $api.patch(`api/users/${userId}/avatar`, formData)
  }

  static async getUserById (userId) {
    return $api.get(`api/users/${userId}`)
  }

  static async createUserForAdmin (login, password, email, role) {
    return $api.post('api/users', { login, password, email, role })
  }

  static async getAllUsers () {
    return $api.get('api/users')
  }

  static async deleteUser (userId) {
    return $api.delete(`api/users/${userId}`)
  }

  static async getAllUsers () {
    return $api.get('api/users')
  }
}
