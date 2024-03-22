import { api, API_HOST } from "@/configs/axios.config";
import TUserData from "@/types/user/TUserData";
import TActions, { ActionUserTable } from "@/types/user/TActions";

class UserService {
    getAll() {
        return api.get<TUserData[]>(`${API_HOST}/user`);
    }

    delete(data: number[]) {
        return api.delete(`${API_HOST}/user`, {
            data,
        });
    }

    update(users: number[], action: TActions, value: boolean) {
        return api.put(`${API_HOST}/user`, {
            users,
            action,
            value,
        });
    }
}

export default new UserService();
