import { Tag } from "react-tag-input";
import TAttributeValue from "@/types/item/TAttributeValue";

type TCreateItemData = {
    name: string;
    image_url: string | null;
    collection_id: number;
    tags: Tag[];
    attributes: TAttributeValue[];
};

export default TCreateItemData;
