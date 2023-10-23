import axios from "axios";
import AuthService from "@/services/authService";

class Store {


    async registration(login, email,  password) {
        try {
            const response = await AuthService.registration(login, email,  password);
            console.log(response);
            localStorage.setItem('token', response.data.accessToken);
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

}

const storeInstance = new Store();
export default storeInstance;