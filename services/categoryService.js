import $api from "@/http";

export default class categoryService {
    static async getCategories() {
        return $api.get(`api/categories`);
    }
}