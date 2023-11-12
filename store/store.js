import { makeAutoObservable } from "mobx";
import AuthService from "@/services/authService";
import Cookies from 'js-cookie';
import $api from "@/http";
import userService from "@/services/userService";

class Store {
    user = {};
    isAuth = false;
    isCheckingAuth = false;

    setAuth(bool) {
        this.isAuth = bool;
    }

    setUser(user) {
        this.user = user;
    }

    constructor() {
        makeAutoObservable(this);
    }

    async registration(login, email, password) {
        try {
            console.log("register")
            const response = await AuthService.registration(login, email, password);
            localStorage.setItem('token', response.data.data.tokens.accessToken);
            this.setUser(response.data.data.user);
            console.log(this.user);
        } catch (error) {

            if (error.response) {
                // Сервер вернул ответ с кодом ошибки
                console.error(error.response.data.error); // здесь будет ваше сообщение об ошибке, например, "Username already exists"

            } else if (error.request) {
                // Запрос был сделан, но ответ не был получен
                console.error("No response from server", error.request);
            } else {
                // Произошла какая-то другая ошибка при отправке запроса
                console.error("Error", error.message);
            }

            throw error;
        }
    }

    async checkAuth() {
        try {
            if (this.isAuth || this.isCheckingAuth) return;
            this.isCheckingAuth = true;
            console.log("checkAuth")
            const response = await $api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/refresh`, { withCredentials: true });
            console.log("response:", response);
            localStorage.setItem('token', response.data.data.accessToken);
            this.setAuth(true);
            console.log("this.isAuth", this.isAuth);
            this.setUser(response.data.data.user);
        } catch (e) {
            console.error("Error", e.message);
        } finally {
            this.isCheckingAuth = false;
        }
    }

    async login(login, password) {
        try {
            const response = await AuthService.login(login, password);
            localStorage.setItem('token', response.data.data.tokens.accessToken);
            this.setUser(response.data.data.user);
            console.log(this.user);
        } catch (error) {

            if (error.response) {
                // Сервер вернул ответ с кодом ошибки
                console.error(error.response.data.error); // здесь будет ваше сообщение об ошибке, например, "Username already exists"

            } else if (error.request) {
                // Запрос был сделан, но ответ не был получен
                console.error("No response from server", error.request);
            } else {
                // Произошла какая-то другая ошибка при отправке запроса
                console.error("Error", error.message);
            }

            throw error;
        }
    }

    async logout() {
        try {
            if (!this.isAuth) throw new Error("User is not authorized");
            console.log("logout")
            await AuthService.logout();
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser({});
        } catch (e) {
            // console.error("Error", e.message);
            throw e;
        }
    }

    async updateUser(user, id) {
        try {
            console.log("updateUser")
            const response = await userService.updateUser(user, id);
            // console.log("response:", response);
            this.setUser(response.data.data.user);
            // console.log(this.user);
            return this.user; // Возвращает обновленные данные пользователя
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async uploadUserAvatar(userId, file) {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await userService.uploadUserAvatar(userId, formData);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async verifyEmail(email) {
        try {
            const response = await AuthService.verifyEmail(email);
            return response.data.message;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getUserById(userId) {
        try {
            const response = await userService.getUserById(userId);
            return response.data.data.user;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

}
const store = new Store();
export default store;

