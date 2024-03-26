import { notFound, redirect } from "next/navigation";
import ItemService from "@/services/item.service";
import ItemEdit from "@/components/item/ItemEdit";
import CollectionService from "@/services/collection.service";

export default async function EditItem({
    params,
}: {
    params: { item_id: string };
}) {
    if (!isNaN(Number(params.item_id))) {
        const item = await ItemService.getById(Number(params.item_id)).then(
            (res) => res.data,
        );

        if (item === null) {
            notFound();
        }

        const collection = await CollectionService.getById(
            Number(item.collection_id),
        ).then((res) => res.data);

        return <ItemEdit collection={collection} data={item} />;
    } else {
        redirect("/");
    }
}
