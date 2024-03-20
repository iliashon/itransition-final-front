import { notFound } from "next/navigation";
import ItemService from "@/services/item.service";
import ItemView from "@/components/item/ItemView";

export default async function Item({ params }: { params: { id: number } }) {
    if (!isNaN(Number(params.id))) {
        const item = await ItemService.getById(Number(params.id)).then(
            (res) => res.data,
        );
        if (item === null) {
            notFound();
        }
        return <ItemView item={item} />;
    } else {
        notFound();
    }
}
