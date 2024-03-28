import { Tag } from "react-tag-input";
import TReadAttributes from "@/types/item/TReadAttributes";
import TTagData from "@/types/tag/TTagData";

type TItemData = {
    id: number;
    name: string;
    image_url: string;
    collection_id: number;
    created_at: string;
    tags: Tag[];
    attributes: TReadAttributes[];
};

export type TItemTableView = {
    id: number;
    name: string;
    image_url: string;
    collection_id: number;
    created_at: string;
    item_tag: { tag: TTagData }[];
    _count: {
        like: number;
    };
};

export type TSearchItemData = {
    id: number;
    name: string;
    image_url: string;
    collection_id: number;
    created_at: string;
    item_tag: { tag: TTagData }[];
    collection: {
        name: string;
        type: string;
        user: {
            first_name: string;
            last_name: string;
        };
    };
};

export default TItemData;
