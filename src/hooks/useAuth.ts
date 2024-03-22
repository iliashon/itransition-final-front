import { useState } from "react";
import TLogInForm from "@/types/auth/TLogInForm";
import AuthService from "@/services/auth.service";
import TSignInForm from "@/types/auth/TSignInForm";
import {
    setItemsLocalStorage,
    clearLocalStorage,
} from "@/utils/localStorageAction";
import reloadPage from "@/utils/reloadPage";
import { AxiosError } from "axios";

export default function useAuth() {
    const [loading, setLoading] = useState(false);

    async function login(data: TLogInForm) {
        setLoading(true);
        try {
            const res = await AuthService.login(data);
            const userData = res.data;
            setItemsLocalStorage({
                userData: userData.user,
                token: userData.accessToken,
            });
            reloadPage();
        } catch (err) {
            if (err instanceof AxiosError) {
                return err.response?.data.message;
            } else {
                throw new Error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    async function register(data: TSignInForm) {
        setLoading(true);
        try {
            const res = await AuthService.register(data);
            const userData = res.data;
            setItemsLocalStorage({
                userData: userData.user,
                token: userData.accessToken,
            });
            reloadPage();
        } catch (err) {
            if (err instanceof AxiosError) {
                return err.response?.data.message;
            } else {
                throw new Error("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    async function refresh() {
        setLoading(true);
        try {
            const res = await AuthService.refresh();
            const userData = res.data;
            setItemsLocalStorage({
                userData: userData.user,
                token: userData.accessToken,
            });
        } catch (err) {
            if (err instanceof AxiosError) {
                if (
                    err.response?.status === 403 ||
                    err.response?.status === 401
                ) {
                    clearLocalStorage();
                    localStorage.setItem(
                        "authError",
                        err.response.data.message,
                    );
                    reloadPage();
                }
            } else {
                console.log(err);
            }
        } finally {
            setLoading(false);
        }
    }

    async function logout() {
        setLoading(true);
        try {
            const res = await AuthService.logout();
            clearLocalStorage();
            reloadPage();
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return { loading, register, login, refresh, logout };
}
