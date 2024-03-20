import { notFound, redirect } from "next/navigation";
import ItemService from "@/services/item.service";
import ItemEdit from "@/components/item/ItemEdit";

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

        return <ItemEdit collection_id={item.collection_id} data={item} />;
    } else {
        redirect("/");
    }
}
