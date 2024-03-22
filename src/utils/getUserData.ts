import TUserData from "@/types/user/TUserData";

export default function getUserData(): TUserData | null {
    return JSON.parse(localStorage.getItem("userData")!);
}
