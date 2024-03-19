import axios from "axios";
import TCreateItemData from "@/types/item/TCreateItemData";
import TItemData from "@/types/item/TItemData";
import { API_HOST } from "@/configs/axios.config";

class ItemService {
    async create(data: TCreateItemData) {
        return axios.post<TItemData>(`${API_HOST}/item`, data);
    }

    async getById(id: number) {
        return axios.get<TItemData>(`${API_HOST}/item/${id}`);
    }

    async getAll(collection_id?: number) {
        return axios.get<TItemData[]>(`${API_HOST}/item`, {
            data: collection_id ? { collection_id } : {},
        });
    }
}

export default new ItemService();
