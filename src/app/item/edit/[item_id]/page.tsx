import CollectionService from "@/services/collection.service";
import { notFound, redirect } from "next/navigation";
import ItemService from "@/services/item.service";
import CreateItem from "@/components/form/CreateItem";

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

        return (
            <main className="px-4">
                <h1 className="text-3xl font-bold py-7">Edit collection</h1>
                <CreateItem
                    collection_id={item.collection_id.toString()}
                    data={item}
                />
            </main>
        );
    } else {
        redirect("/");
    }
}
