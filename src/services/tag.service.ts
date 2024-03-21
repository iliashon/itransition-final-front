import axios from "axios";
import { API_HOST } from "@/configs/axios.config";
import TTagData from "@/types/tag/TTagData";
import TTagsCloud from "@/types/tag/TTagsCloud";

class TagService {
    getAll() {
        return axios.get<TTagData[]>(`${API_HOST}/tag`);
    }

    getTagsCloud() {
        return axios.get<TTagsCloud[]>(`${API_HOST}/tag/cloud`);
    }
}

export default new TagService();
