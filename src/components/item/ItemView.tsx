"use client";

import Like from "@/components/view/Like";
import Image from "next/image";
import TItemData from "@/types/item/TItemData";
import { useEffect, useState } from "react";
import TUserData from "@/types/auth/TUserData";
import getUserData from "@/utils/getUserData";
import CommentBlock from "@/components/view/CommentBlock";

export default function ItemView({ item }: { item: TItemData }) {
    const [userData, setUserData] = useState<TUserData | null>();

    useEffect(() => {
        setUserData(getUserData());
    }, []);

    return (
        <main className="mx-14 mt-10">
            <div className="grid grid-cols-2 gap-5">
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl font-semibold">{item.name}</h1>
                    <Like item_id={item.id} user_id={userData?.id} />
                </div>
                <div>
                    <Image
                        src={item.image_url || ""}
                        alt="image"
                        className="w-full rounded-xl mb-5"
                        width={500}
                        height={500}
                    />
                </div>
            </div>
            <hr />
            <CommentBlock item_id={item.id} />
        </main>
    );
}
