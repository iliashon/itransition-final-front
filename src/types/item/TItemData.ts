import { Tag } from "react-tag-input";
import TReadAttributes from "@/types/item/TReadAttributes";

type TItemData = {
    id: number;
    name: string;
    image_url: string;
    collection_id: number;
    created_at: string;
    tags: Tag[];
    attributes: TReadAttributes[];
};

export default TItemData;
