import axios from "axios";
import TCollectionType from "@/types/collection/TCollectionType";
import TCreateCollectionData from "@/types/collection/TCreateCollectionData";
import TCollectionData from "@/types/collection/TCollectionData";
import { api, API_HOST } from "@/configs/axios.config";

class CollectionService {
    async getAllType() {
        return axios.get<TCollectionType[]>(`${API_HOST}/collection-type`);
    }

    async getAll() {
        return axios.get<TCollectionData[]>(`${API_HOST}/collection`);
    }

    async getById(id: number) {
        return axios.get<TCollectionData>(`${API_HOST}/collection/${id}`);
    }

    async create(data: TCreateCollectionData) {
        return api.post<TCollectionData>(`${API_HOST}/collection`, {
            ...data,
        });
    }

    async update(data: TCreateCollectionData, id: number) {
        return axios.put(`${API_HOST}/collection/${id}`, {
            ...data,
        });
    }
}

export default new CollectionService();
