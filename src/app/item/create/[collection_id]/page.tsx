import ItemEdit from "@/components/item/ItemEdit";
import { notFound } from "next/navigation";
import CollectionService from "@/services/collection.service";

export default async function CreateItemPage({
    params,
}: {
    params: { collection_id: string };
}) {
    if (!isNaN(Number(params.collection_id))) {
        const collection = await CollectionService.getById(
            Number(params.collection_id),
        ).then((res) => res.data);
        if (collection === null) {
            notFound();
        }
        return <ItemEdit collection={collection} />;
    } else {
        notFound();
    }
}
