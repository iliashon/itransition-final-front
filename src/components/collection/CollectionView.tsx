"use client";

import Link from "next/link";
import { FaEdit } from "react-icons/fa";
import Image from "next/image";
import ItemTable from "@/components/view/ItemTable";
import TCollectionData from "@/types/collection/TCollectionData";
import TItemData from "@/types/item/TItemData";
import MarkdownEditor from "@uiw/react-markdown-editor";

export default function CollectionView({
    collection,
    items,
}: {
    collection: TCollectionData;
    items: TItemData[];
}) {
    return (
        <main className="mx-14 mt-10 flex flex-col gap-5">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-1">
                    <h1 className="text-5xl font-semibold">
                        {collection.name}
                    </h1>
                    <h2 className="text-sm text-gray-500 underline hover:text-gray-700 cursor-default duration-300">
                        Type: {collection.type}
                    </h2>
                </div>
                <Link href={`/collection/edit/${collection.id}`}>
                    <FaEdit className="h-6 w-6 text-gray-500 hover:text-gray-700" />
                </Link>
            </div>
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <MarkdownEditor.Markdown
                        source={collection.description}
                        className="!bg-transparent"
                    />
                </div>
                <div>
                    <Image
                        src={collection.image_url}
                        alt="image"
                        className="w-full rounded-xl mb-5"
                        width={500}
                        height={500}
                    />
                    <ItemTable data={items} />
                    <Link
                        href={`/item/create/${collection.id}`}
                        className="bg-gray-600 py-2 justify-center rounded-full text-white flex mt-5"
                    >
                        Create Item
                    </Link>
                </div>
            </div>
        </main>
    );
}
