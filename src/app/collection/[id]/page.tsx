import CollectionService from "@/services/collection.service";
import { notFound, redirect } from "next/navigation";
import ItemService from "@/services/item.service";
import CollectionView from "@/components/collection/CollectionView";

export default async function CollectionPreview({
    params,
}: {
    params: { id: string };
}) {
    if (!isNaN(Number(params.id))) {
        const collection = await CollectionService.getById(
            Number(params.id),
        ).then((res) => res.data);

        if (collection === null) {
            notFound();
        }

        const itemsFromCollection = await ItemService.getAll(
            collection.id,
        ).then((res) => res.data);

        return (
            <CollectionView
                collection={collection}
                items={itemsFromCollection}
            />
        );
    } else {
        redirect("/");
    }
}
