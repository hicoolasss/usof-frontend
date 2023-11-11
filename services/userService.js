import $api from "@/http";

export default class userService {
    static async updateUser(user, id) {
       return $api.patch(`api/users/${id}`, user);
    }

    static async uploadUserAvatar(userId, formData) {
        return $api.patch(`api/users/${userId}/avatar`, formData);
    }

    static async getUserById(userId) {
        return $api.get(`api/users/${userId}`);
    }

}
