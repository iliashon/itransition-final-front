import TLogInForm from "@/types/auth/TLogInForm";
import axios from "axios";
import TResponseAuth from "@/types/auth/TResponseLogin";
import TSignInForm from "@/types/auth/TSignInForm";
import { api, API_HOST } from "@/configs/axios.config";

class AuthService {
    login(data: TLogInForm) {
        return axios.post<TResponseAuth>(
            `${API_HOST}/auth/login`,
            {
                ...data,
            },
            {
                withCredentials: true,
                headers: {
                    "Accept-Language": localStorage.getItem("i18nextLng"),
                },
            },
        );
    }

    register(data: TSignInForm) {
        return axios.post<TResponseAuth>(
            `${API_HOST}/auth/register`,
            {
                ...data,
            },
            {
                withCredentials: true,
                headers: {
                    "Accept-Language": localStorage.getItem("i18nextLng"),
                },
            },
        );
    }

    refresh() {
        return api.post<TResponseAuth>(
            "auth/refresh",
            {},
            {
                headers: {
                    "Accept-Language": localStorage.getItem("i18nextLng"),
                },
            },
        );
    }

    logout() {
        return api.post("auth/logout");
    }
}

export default new AuthService();
