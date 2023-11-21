import $api from "@/http";

export default class categoryService {
    static async getCategories() {
        return $api.get(`api/categories`);
    }
    static async getCategoryById(categoryId) {
        return $api.get(`api/categories/${categoryId}`);
    }
    static async createCategory(title, description) {
        return $api.post(`api/categories`, { title, description });
    }
}