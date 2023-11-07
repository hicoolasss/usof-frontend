import $api from "@/http";

export default class AuthService {



    static registration(login, email, password) {
        return $api.post('api/auth/register', { login, email, password });
    }

    static login(login, password) {
        return $api.post('api/auth/login', { login, password });
    }

    static logout() {
        return $api.post('api/auth/logout');
    }

}
