"use client";

import Link from "next/link";
import ItemTable from "@/components/view/ItemTable";
import TCollectionData from "@/types/collection/TCollectionData";
import TItemData from "@/types/item/TItemData";
import MarkdownEditor from "@uiw/react-markdown-editor";
import ActionCollection from "@/components/view/ActionCollection";
import { useEffect, useState } from "react";
import TUserData from "@/types/auth/TUserData";
import getUserData from "@/utils/getUserData";

export default function CollectionView({
    collection,
    items,
}: {
    collection: TCollectionData;
    items: TItemData[];
}) {
    const [userData, setUserData] = useState<TUserData | null>();

    useEffect(() => {
        setUserData(getUserData());
    }, []);

    return (
        <main className="lg:px-14 px-4 mt-10 mb-5 flex flex-col gap-5">
            <div className="grid xl:grid-cols-2 grid-cols-1 items-center gap-5">
                <div className="flex flex-col gap-5">
                    <div className="flex justify-between">
                        <div className="flex flex-col gap-3">
                            <h1 className="text-5xl font-semibold">
                                {collection.name}
                            </h1>
                            <h2 className="text-sm text-gray-500 underline hover:text-gray-700 cursor-default duration-300">
                                Type: {collection.type}
                            </h2>
                        </div>
                        {(collection.user_id === userData?.id && (
                            <ActionCollection collection={collection} />
                        )) ||
                            (userData?.is_admin && (
                                <ActionCollection collection={collection} />
                            ))}
                    </div>
                    <MarkdownEditor.Markdown
                        source={collection.description}
                        className="!bg-transparent h-80 overflow-scroll"
                    />
                </div>
                <div className="relative row-start-1 xl:col-start-2 h-full w-full overflow-hidden rounded-lg bg-white">
                    <img
                        src={collection.image_url || "/imageNotFound.jpeg"}
                        alt="image"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
            </div>
            <hr />
            <ItemTable data={items} />
            <Link
                href={`/item/create/${collection.id}`}
                className="bg-gray-600 py-2 justify-center rounded-full text-white flex"
            >
                Create Item
            </Link>
        </main>
    );
}