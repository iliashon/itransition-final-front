import axios from "axios";
import TCollectionType from "@/types/collection/TCollectionType";
import TCreateCollectionData from "@/types/collection/TCreateCollectionData";
import TCollectionData from "@/types/collection/TCollectionData";
import { api } from "@/configs/axios.config";

class CollectionService {
    async getAllType() {
        return axios.get<TCollectionType[]>(
            "http://localhost:4145/collection-type",
        );
    }

    async getById(id: number) {
        return axios.get<TCollectionData>(
            `http://localhost:4145/collection/${id}`,
        );
    }

    async createCollection(data: TCreateCollectionData) {
        return api.post<TCollectionData>("http://localhost:4145/collection", {
            ...data,
        });
    }
}

export default new CollectionService();
