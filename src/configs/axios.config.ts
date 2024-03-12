import axios from "axios";
import setItemsLocalStorage from "@/utils/setItemLocalStorage";
import TResponseAuth from "@/types/auth/TResponseLogin";
import clearLocalStorage from "@/utils/clearLocalStorage";

export const API_ENDPOINT = "http://localhost:4145";

export const api = axios.create({
    withCredentials: true,
    baseURL: API_ENDPOINT,
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
                    `${API_ENDPOINT}/auth/refresh`,
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
                console.log(err);
            }
        }
        throw error;
    },
);
