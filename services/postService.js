import $api from "@/http";

export default class postService {
    static async createPost(title, publish_date, status, content, categories) {
        return $api.post(`api/posts`, { title, publish_date, status, content, categories });
    }
    static async getPosts() {
        return $api.get(`api/posts`);
    }
}