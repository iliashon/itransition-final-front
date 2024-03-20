import { Tag } from "react-tag-input";

type TCreateItemData = {
    name: string;
    image_url: string | null;
    collection_id: number;
    tags: Tag[];
};

export default TCreateItemData;
