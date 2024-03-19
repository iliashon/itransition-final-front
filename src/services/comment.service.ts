import { api, API_HOST } from "@/configs/axios.config";
import TCommentList from "@/types/comment/TCommentList";
import TCreateCommentData from "@/types/comment/TCreateCommentData";

class CommentService {
    getByItemId(item_id: number) {
        return api.get<TCommentList[]>(`${API_HOST}/comment/${item_id}`);
    }

    create(data: TCreateCommentData) {
        return api.post<TCommentList>(`${API_HOST}/comment`, data);
    }
}

export default new CommentService();
