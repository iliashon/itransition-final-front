"use client";

import TItemData from "@/types/item/TItemData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TCreateItemData from "@/types/item/TCreateItemData";
import { Tag } from "react-tag-input";
import ItemService from "@/services/item.service";
import InputTags from "@/components/edit/InputTags";
import UploadImage from "@/components/edit/UploadImage";
import { Button } from "@material-tailwind/react";

export default function ItemEdit({
    collection_id,
    data,
}: {
    collection_id: number;
    data?: TItemData;
}) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [stateCreateItem, setStateCreateItem] = useState<TCreateItemData>({
        name: data?.name || "",
        image_url: data?.image_url || null,
        collection_id: collection_id,
        tags: [],
    });

    const handleImage = (value: string) => {
        setStateCreateItem({
            ...stateCreateItem,
            image_url: value,
        });
    };

    const handleTags = (value: Tag[]) => {
        setStateCreateItem({
            ...stateCreateItem,
            tags: value,
        });
    };

    const handleUploadItem = async () => {
        setLoading(true);
        if (data) {
            const item = await ItemService.update(
                {
                    ...stateCreateItem,
                },
                Number(data?.id),
            ).then((res) => router.push(`/item/${res.data.id}`));
        } else {
            const item = await ItemService.create({
                ...stateCreateItem,
            }).then((res) => router.push(`/item/${res.data.id}`));
        }
        setLoading(false);
        router.refresh();
    };

    return (
        <main className="px-4">
            <h1 className="text-3xl font-bold py-7">
                {data ? "Edit item" : "Create item"}
            </h1>
            <section className="relative grid lg:grid-cols-3 grid-cols-1 gap-5">
                <div className="flex flex-col gap-5 lg:col-span-2 col-auto">
                    <input
                        type="text"
                        className="border dark:border-white border-black/30 bg-transparent rounded w-full h-12 px-3 text-xl focus:outline-none"
                        placeholder="Title"
                        value={stateCreateItem.name}
                        onChange={(event) =>
                            setStateCreateItem({
                                ...stateCreateItem,
                                name: event.target.value,
                            })
                        }
                    />
                    <InputTags setTags={handleTags} tags={data?.tags} />
                </div>
                <div className="flex flex-col justify-between gap-5">
                    <UploadImage
                        value={stateCreateItem.image_url}
                        setValue={handleImage}
                        folder_name="item"
                    />
                    <Button
                        loading={loading}
                        onClick={handleUploadItem}
                        className="dark:text-black dark:bg-white flex justify-center my-5 lg:m-0"
                    >
                        {data ? "Update" : "Create"}
                    </Button>
                </div>
            </section>
        </main>
    );
}
