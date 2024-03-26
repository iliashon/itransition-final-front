import TAttributeData, {
    TCreateAttributeData,
} from "@/types/collection/TAttributeData";

type TCreateCollectionData = {
    name: string;
    description: string;
    type: string;
    image_url: string;
    attributes: TCreateAttributeData[];
};

export default TCreateCollectionData;
