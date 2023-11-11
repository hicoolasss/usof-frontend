import $api from "@/http";

export default class userService {
    static async updateUser(user, id) {
       return $api.patch(`api/users/${id}`, user);
    }

}
