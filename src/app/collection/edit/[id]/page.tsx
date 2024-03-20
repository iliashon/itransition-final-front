import CollectionService from "@/services/collection.service";
import { notFound, redirect } from "next/navigation";
import CollectionEdit from "@/components/collection/CollectionEdit";

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

        return <CollectionEdit data={collection} />;
    } else {
        redirect("/");
    }
}
