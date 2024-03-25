import { Tag } from "react-tag-input";

type TItemData = {
    id: number;
    name: string;
    image_url: string;
    collection_id: number;
    created_at: string;
    tags: Tag[];
};

export default TItemData;
