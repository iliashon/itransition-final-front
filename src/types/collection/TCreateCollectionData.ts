import TAttributeData from "@/types/collection/TAttributeData";

type TCreateCollectionData = {
    name: string;
    description: string;
    type: string;
    image_url: string;
    attributes: TAttributeData[];
};

export default TCreateCollectionData;
