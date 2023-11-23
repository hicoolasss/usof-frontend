import $api from '@/http'
export default class commentService {
  static async getCommentById (commentId) {
    return $api.get(`api/comments/${commentId}`)
  }

  static async likeComment (commentId) {
    return $api.post(`api/comments/${commentId}/like`)
  }
}
