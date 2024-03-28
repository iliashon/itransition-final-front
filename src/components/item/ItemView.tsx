"use client";

import Like from "@/components/view/Like";
import TItemData from "@/types/item/TItemData";
import { useEffect, useState } from "react";
import TUserData from "@/types/user/TUserData";
import getUserData from "@/utils/getUserData";
import CommentBlock from "@/components/view/CommentBlock";
import ActionItems from "@/components/view/ActionItems";
import TCollectionData from "@/types/collection/TCollectionData";
import TagsView from "@/components/view/TagsView";
import BackButton from "@/components/view/BackButton";
import AttributesView from "@/components/view/AttributesView";
import Link from "next/link";

export default function ItemView({
    item,
    collection,
}: {
    item: TItemData;
    collection: TCollectionData;
}) {
    const [userData, setUserData] = useState<TUserData | null>();

    useEffect(() => {
        setUserData(getUserData());
    }, []);

    console.log(item);

    return (
        <main className="mt-5 px-4 max-w-[1320px] mx-auto">
            <div className="mb-5">
                <BackButton backPath={`/collection/${collection.id}`} />
            </div>
            <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 mb-5">
                <div className="relative h-[500px] w-full overflow-hidden rounded-2xl bg-white border">
                    <img
                        src={item.image_url || "/imageNotFound.jpeg"}
                        alt="image"
                        className="h-full w-full object-cover object-center"
                    />
                </div>
                <div className="flex flex-col justify-between gap-5">
                    <div className="w-full">
                        <h1 className="text-3xl text-center font-semibold mb-5">
                            {item.name}
                        </h1>
                        <TagsView tags={item.tags} />
                        <AttributesView attributes={item.attributes} />
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <div className="flex gap-3">
                            <Like item_id={item.id} user_id={userData?.id} />
                            <Link href={`/collection/${collection.id}`}>
                                {collection.name}
                            </Link>
                        </div>

                        {(collection.user_id === userData?.id && (
                            <ActionItems
                                item_id={item.id}
                                collection_id={item.collection_id}
                            />
                        )) ||
                            (userData?.is_admin && (
                                <ActionItems
                                    item_id={item.id}
                                    collection_id={item.collection_id}
                                />
                            ))}
                    </div>
                </div>
            </div>
            <hr />
            <CommentBlock item_id={item.id} />
        </main>
    );
}
