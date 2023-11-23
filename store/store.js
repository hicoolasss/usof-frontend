import { makeAutoObservable } from "mobx";
import AuthService from "@/services/authService";
import Cookies from 'js-cookie';
import $api from "@/http";
import userService from "@/services/userService";
import categoryService from "@/services/categoryService";
import postService from "@/services/postService";
import commentService from "@/services/commentService";

class Store {
    user = {};
    categories = [];
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

    async registration(login, email, password, role, forAdmin) {
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

            // Попытка восстановить данные пользователя из localStorage
            const storedUser = localStorage.getItem('userData');

            if (storedUser) {
                const userData = JSON.parse(storedUser);
                this.setUser(userData);
                this.setAuth(true);
                return; // Пользователь уже аутентифицирован
            }

            const response = await AuthService.refresh();
            console.log("response:", response);

            localStorage.setItem('token', response.data.data.accessToken);
            localStorage.setItem('userData', JSON.stringify(response.data.data.user));

            this.setAuth(true);
            this.setUser(response.data.data.user);
        } catch (e) {
            console.error("Error", e.message);
            // В случае ошибки, можно также очистить localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
        } finally {
            this.isCheckingAuth = false;
        }
    }


    async login(login, password) {
        try {
            const response = await AuthService.login(login, password);
            localStorage.setItem('token', response.data.data.tokens.accessToken);
            this.setUser(response.data.data.user);
            console.log("login", this.user);
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
            const user = JSON.parse(localStorage.getItem('userData'));
            if (!user) throw new Error("User is not authorized");
            console.log("logout")
            await AuthService.logout();
            localStorage.removeItem('token');
            localStorage.removeItem('userData');
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
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify(response.data.data.user));
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
            localStorage.setItem('userData', JSON.stringify(response.data.data.userData));
            this.setUser(response.data.data.userData);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async verifyEmail(email, userId) {
        try {
            await AuthService.verifyEmail(email);
            const response = await userService.getUserById(userId);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getUpdatedEmailVerificationStatus(token) {
        try {
            const response = await AuthService.getUpdatedEmailVerificationStatus(token);
            localStorage.removeItem('userData');
            localStorage.setItem('userData', JSON.stringify(response.data.data.user));

            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getUserById(userId) {
        try {
            const response = await userService.getUserById(userId);
            return response.data.data;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getCategoryById(categoryId) {
        try {
            const response = await categoryService.getCategoryById(categoryId);
            return response.data.data;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getCategories() {
        try {
            const response = await categoryService.getCategories();
            this.categories = response.data.data;
            return response.data.data;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async createCategory(title, description) {
        try {
            const response = await categoryService.createCategory(title, description);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }

    }

    async createUserForAdmin(login, password, email, role) {
        try {
            const response = await userService.createUserForAdmin(login, password, email, role);
            console.log(role);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getAllUsers() {
        try {
            const response = await userService.getAllUsers();
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async deleteUser(userId) {
        try {
            const response = await userService.deleteUser(userId);
            console.log(response);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async createPost(title, publish_date, status, content, categories) {
        try {
            const response = await postService.createPost(title, publish_date, status, content, categories);
            console.log(response);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }
    async deletePost(postId) {
        try {
            const response = await postService.deletePost(postId);
            console.log(response);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async createComment(content, postId, userId) {
        try {
            const response = await postService.createComment(content, postId, userId);
            console.log(response);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getCommentById(commentId) {
        try {
            const response = await commentService.getCommentById(commentId);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async likeComment(commentId) {
        try {
            const response = await commentService.likeComment(commentId);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async deleteCommentById(commentId) {
        try {
            const response = await commentService.deleteCommentById(commentId);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }


    async getPosts() {
        try {
            const response = await postService.getPosts();
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async getPostById(postId) {
        try {
            const response = await postService.getPostById(postId);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async resetPassword(email) {
        try {
            const response = await AuthService.resetPassword(email);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async changePassword(token, newPassword) {
        try {
            const response = await AuthService.changePassword(token, newPassword);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }

    async likePost(postId) {

        try {
            const response = await postService.likePost(postId);
            return response;
        } catch (e) {
            console.error("Error", e.message);
        }
    }


}
const store = new Store();
export default store;

