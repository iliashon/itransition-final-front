import { notFound } from "next/navigation";
import ItemService from "@/services/item.service";
import ItemView from "@/components/item/ItemView";
import CollectionService from "@/services/collection.service";

export default async function Item({ params }: { params: { id: number } }) {
    if (!isNaN(Number(params.id))) {
        const item = await ItemService.getById(Number(params.id)).then(
            (res) => res.data,
        );
        if (item === null) {
            notFound();
        }
        const collection = await CollectionService.getById(
            Number(item.collection_id),
        ).then((res) => res.data);

        return <ItemView item={item} collection={collection} />;
    } else {
        notFound();
    }
}
