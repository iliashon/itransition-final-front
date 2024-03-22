import TUserData from "@/types/user/TUserData";

export function clearLocalStorage() {
    localStorage.removeItem("userData");
    localStorage.removeItem("token");
}
export function setItemsLocalStorage({
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
