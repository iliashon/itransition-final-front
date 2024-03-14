import axios from "axios";
import TCollectionType from "@/types/collection/TCollectionType";

class CollectionService {
    async getAllType() {
        return axios.get<TCollectionType[]>(
            "http://localhost:4145/collection-type",
        );
    }
}

export default new CollectionService();
