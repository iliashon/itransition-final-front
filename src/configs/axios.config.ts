import axios from "axios";
import TResponseAuth from "@/types/auth/TResponseLogin";
import {
    setItemsLocalStorage,
    clearLocalStorage,
} from "@/utils/localStorageAction";

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;

export const api = axios.create({
    withCredentials: true,
    baseURL: API_HOST,
});

api.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

api.interceptors.response.use(
    (config) => {
        return config;
    },
    async (error) => {
        const originalRequest = error.config;
        if (
            error.response.status === 401 &&
            error.config &&
            !error.config._isRetry
        ) {
            originalRequest._isRetry = true;
            try {
                const res = await axios.post<TResponseAuth>(
                    `${API_HOST}/auth/refresh`,
                    {
                        withCredentials: true,
                    },
                );
                setItemsLocalStorage({
                    userData: res.data.user,
                    token: res.data.accessToken,
                });
                return api.request(originalRequest);
            } catch (err) {
                clearLocalStorage();
                // reloadPage();
                console.log(err);
            }
        }
        throw error;
    },
);
