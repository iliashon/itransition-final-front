import axios from "axios";
import TCreateItemData from "@/types/item/TCreateItemData";
import TItemData from "@/types/item/TItemData";

class ItemService {
    async create(data: TCreateItemData) {
        return axios.post<TItemData>("http://localhost:4145/item", data);
    }

    async getById(id: number) {
        return axios.get<TItemData>(`http://localhost:4145/item/${id}`);
    }
}

export default new ItemService();
