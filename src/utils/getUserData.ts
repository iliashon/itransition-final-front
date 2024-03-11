import TUserData from "@/types/auth/TUserData";

export default function getUserData(): TUserData | null {
    return JSON.parse(localStorage.getItem("userData")!);
}
