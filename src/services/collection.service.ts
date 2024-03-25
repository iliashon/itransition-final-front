import axios from "axios";
import TCollectionType from "@/types/collection/TCollectionType";
import TCreateCollectionData from "@/types/collection/TCreateCollectionData";
import TCollectionData from "@/types/collection/TCollectionData";
import { api, API_HOST } from "@/configs/axios.config";

class CollectionService {
    getAllType() {
        return axios.get<TCollectionType[]>(`${API_HOST}/collection-type`);
    }

    getAll() {
        return axios.get<TCollectionData[]>(`${API_HOST}/collection`);
    }

    getById(id: number) {
        return axios.get<TCollectionData>(`${API_HOST}/collection/${id}`);
    }

    create(data: TCreateCollectionData) {
        return api.post<TCollectionData>(`${API_HOST}/collection`, {
            ...data,
        });
    }

    update(data: TCreateCollectionData, id: number) {
        return api.put(`${API_HOST}/collection/${id}`, {
            ...data,
        });
    }

    delete(id: number) {
        return api.delete(`${API_HOST}/collection/${id}`);
    }

    getTop() {
        return axios.get<TCollectionData[]>(`${API_HOST}/collection/top`);
    }
}

export default new CollectionService();
