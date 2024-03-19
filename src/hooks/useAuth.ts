import { useState } from "react";
import TLogInForm from "@/types/auth/TLogInForm";
import AuthService from "@/services/auth.service";
import setItemsLocalStorage from "@/utils/setItemLocalStorage";
import TSignInForm from "@/types/auth/TSignInForm";
import clearLocalStorage from "@/utils/clearLocalStorage";
import { useRouter } from "next/navigation";
import reloadPage from "@/utils/reloadPage";

export default function useAuth() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function login(data: TLogInForm) {
        setLoading(true);
        try {
            const res = await AuthService.login(data);
            const userData = res.data;
            setItemsLocalStorage({
                userData: userData.user,
                token: userData.accessToken,
            });
            // reloadPage();
        } catch (err) {
            console.log(err);
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
            console.log(err);
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
            console.log(err);
            // clearLocalStorage();
            // reloadPage();
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
