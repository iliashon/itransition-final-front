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

    return (
        <main className="mt-10 px-4 max-w-[1320px] mx-auto">
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
                    </div>
                    <div className="flex w-full justify-between items-center">
                        <Like item_id={item.id} user_id={userData?.id} />
                        {(collection.user_id === userData?.id && (
                            <ActionItems item={item} />
                        )) ||
                            (userData?.is_admin && <ActionItems item={item} />)}
                    </div>
                </div>
            </div>
            <hr />
            <CommentBlock item_id={item.id} />
        </main>
    );
}
