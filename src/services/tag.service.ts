import axios from "axios";
import { API_HOST } from "@/configs/axios.config";
import TTagData from "@/types/tag/TTagData";

class TagService {
    getAll() {
        return axios.get<TTagData[]>(`${API_HOST}/tag`);
    }
}

export default new TagService();
