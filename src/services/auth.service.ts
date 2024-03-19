import TLogInForm from "@/types/auth/TLogInForm";
import axios from "axios";
import TResponseAuth from "@/types/auth/TResponseLogin";
import TSignInForm from "@/types/auth/TSignInForm";
import { api, API_HOST } from "@/configs/axios.config";

class AuthService {
    async login(data: TLogInForm) {
        return await axios.post<TResponseAuth>(
            `${API_HOST}/auth/login`,
            {
                ...data,
            },
            { withCredentials: true },
        );
    }

    async register(data: TSignInForm) {
        return await axios.post<TResponseAuth>(
            `${API_HOST}/auth/register`,
            {
                ...data,
            },
            { withCredentials: true },
        );
    }

    async refresh() {
        return await api.post<TResponseAuth>("auth/refresh");
    }

    async logout() {
        return await api.post("auth/logout");
    }
}

export default new AuthService();
