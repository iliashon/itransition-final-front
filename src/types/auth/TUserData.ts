type TUserData = {
    id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    image_url: string;
    is_admin: boolean;
    blocked: boolean;
    created_at: Date;
    updated_at: Date;
};

export default TUserData;
