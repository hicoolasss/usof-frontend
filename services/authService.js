import $api from "@/http";

export default class AuthService {



    static registration(login, email, password) {
        return $api.post('api/auth/register', { login, email, password });
    }


}
