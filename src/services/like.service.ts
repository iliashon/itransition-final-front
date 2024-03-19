import axios from "axios";
import { api, API_HOST } from "@/configs/axios.config";
import TLikeData from "@/types/like/TLikeData";

class LikeService {
    create(item_id: number) {
        return api.post<TLikeData>(`${API_HOST}/like/${item_id}`);
    }

    delete(like_id: number) {
        return api.delete(`${API_HOST}/like/${like_id}`, {});
    }

    getByItemId(item_id: number) {
        return axios.get<TLikeData[]>(`${API_HOST}/like/${item_id}`);
    }
}

export default new LikeService();
