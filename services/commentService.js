import $api from "@/http";
export default class commentService {
    static async getCommentById(commentId) {
        return $api.get(`api/comments/${commentId}`);
    }
}