import TAttributeData from "@/types/collection/TAttributeData";

type TCollectionData = {
    id: number;
    user_id: number;
    user: {
        first_name: string;
        last_name: string;
        email: string;
    };
    attribute: TAttributeData[];
    name: string;
    description: string;
    type: string;
    image_url: string;
    created_at: string;
    _count: {
        item: number;
    };
};

export default TCollectionData;
