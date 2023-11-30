import $api from "@/http";

export default class postService {
    
    static async createPost(title, publish_date, status, content, categories) {
        return $api.post(`api/posts`, { title, publish_date, status, content, categories });
    }
    static async getPosts() {
        return $api.get(`api/posts`);
    }
    static async getPostById(postId) {
        return $api.get(`api/posts/${postId}`);
    }
    static async createComment(content, postId, userId) {
        return $api.post(`api/posts/${postId}/comments`, { content, postId, userId });
    }
    static async likePost(postId) {
        return $api.post(`api/posts/${postId}/like`, { postId });
    }
    static async deletePost(postId) {
        return $api.delete(`api/posts/${postId}`);
    }

}