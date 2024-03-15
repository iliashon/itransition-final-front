import TUserData from "@/types/auth/TUserData";

export default function setItemsLocalStorage({
    userData,
    token,
}: {
    userData?: TUserData;
    token?: string;
}) {
    if (userData) {
        localStorage.setItem("userData", JSON.stringify(userData));
    }
    if (token) {
        localStorage.setItem("token", JSON.stringify(token).slice(1, -1));
    }
}
