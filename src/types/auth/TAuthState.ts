import TUserData from "@/types/auth/TUserData";

type TAuthState = {
    isAuth: boolean;
    user: TUserData | null;
};

export default TAuthState;
