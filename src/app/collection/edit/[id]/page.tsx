import CreateCollection from "@/components/form/CreateCollection";
import CollectionService from "@/services/collection.service";
import { notFound, redirect } from "next/navigation";
import ItemService from "@/services/item.service";

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
            <main className="px-4">
                <h1 className="text-3xl font-bold py-7">Edit collection</h1>
                <CreateCollection data={collection} />
            </main>
        );
    } else {
        redirect("/");
    }
}
