import TUserData from "@/types/user/TUserData";

type TResponseAuth = {
    accessToken: string;
    refreshToken: string;
    user: TUserData;
};

export default TResponseAuth;
