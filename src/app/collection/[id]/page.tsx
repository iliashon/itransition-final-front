import CollectionService from "@/services/collection.service";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import PreviewMarkdown from "@/components/markdown/PreviewMarkdown";
import ItemTable from "@/components/table/ItemTable";
import Link from "next/link";
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
            <section className="mx-14 grid grid-cols-2 gap-5 mt-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl font-semibold">
                        {collection.name}
                    </h1>
                    <Link
                        href={`/collection/edit/${collection.id}`}
                        className="bg-gray-600 flex justify-center py-1 rounded-full text-white"
                    >
                        Edit
                    </Link>
                    <h2 className="text-lg underline">
                        Collection type: {collection.type}
                    </h2>
                    <PreviewMarkdown value={collection.description} />
                </div>
                <div>
                    <Image
                        src={collection.image_url}
                        alt="image"
                        className="w-full rounded-xl mb-5"
                        width={500}
                        height={500}
                    />
                    <ItemTable data={itemsFromCollection} />
                    <Link
                        href={`/item/create/${collection.id}`}
                        className="bg-gray-600 py-2 justify-center rounded-full text-white flex mt-5"
                    >
                        Create Item
                    </Link>
                </div>
            </section>
        );
    } else {
        redirect("/");
    }
}
