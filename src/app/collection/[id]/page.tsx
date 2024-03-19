import CollectionService from "@/services/collection.service";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import PreviewMarkdown from "@/components/markdown/PreviewMarkdown";
import ItemTable from "@/components/table/ItemTable";
import Link from "next/link";
import ItemService from "@/services/item.service";
import { FaEdit } from "react-icons/fa";

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
            <section className="mx-14 mt-10 flex flex-col gap-5">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-5xl font-semibold">
                            {collection.name}
                        </h1>
                        <h2 className="text-sm text-gray-500 underline hover:text-gray-700 cursor-default duration-300">
                            Type: {collection.type}
                        </h2>
                    </div>
                    <div>
                        <Link href={`/collection/edit/${collection.id}`}>
                            <FaEdit className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                        </Link>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className="flex flex-col gap-5">
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
                </div>
            </section>
        );
    } else {
        redirect("/");
    }
}
