import AuthService from "@/services/authService";

export default class Store {
    user = {};
    isAuth = false;
   

    static setAuth(bool) {
        this.isAuth = bool;
    }

    static setUser(user) {
        this.user = user;
    }

    static async registration(login, email,  password) {
        try {
            console.log("register")
            const response = await AuthService.registration(login, email,  password);
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

    static async checkAuth() {
        try {
            const response = await axios.get(`${process.env.API_URL}/api/auth/refresh`, { withCredentials: true });
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            console.log(this.isAuth);
            this.setUser(response.data.user);
        } catch (e) {
            console.log(e.response?.data?.message);
        }
    }

   
     

}

