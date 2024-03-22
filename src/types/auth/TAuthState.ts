import TUserData from "@/types/user/TUserData";

type TAuthState = {
    isAuth: boolean;
    user: TUserData | null;
};

export default TAuthState;
