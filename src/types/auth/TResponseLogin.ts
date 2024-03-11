import TUserData from "@/types/auth/TUserData";

type TResponseAuth = {
    accessToken: string;
    refreshToken: string;
    user: TUserData;
};

export default TResponseAuth;
