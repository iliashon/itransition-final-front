import axios from "axios";
import TCreateItemData from "@/types/item/TCreateItemData";
import TItemData from "@/types/item/TItemData";
import { api, API_HOST } from "@/configs/axios.config";

class ItemService {
    create(data: TCreateItemData) {
        return api.post<TItemData>(`${API_HOST}/item`, data);
    }

    getById(id: number) {
        return axios.get<TItemData>(`${API_HOST}/item/${id}`);
    }

    getAll(collection_id?: number) {
        return axios.get<TItemData[]>(`${API_HOST}/item`, {
            data: collection_id ? { collection_id } : {},
        });
    }

    update(data: TCreateItemData, id: number) {
        return api.put<TItemData>(`${API_HOST}/item/${id}`, {
            ...data,
        });
    }

    delete(id: number) {
        return api.delete(`${API_HOST}/item/${id}`);
    }

    getLastItems() {
        return axios.get<TItemData[]>(`${API_HOST}/item/last`);
    }
}

export default new ItemService();
