"use client";

import { useState } from "react";
import TCreateItemData from "@/types/item/TCreateItemData";
import UploadImage from "@/components/input/UploadImage";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import ItemService from "@/services/item.service";
import TItemData from "@/types/item/TItemData";

export default function CreateItem({
    collection_id,
    data,
}: {
    data?: TItemData;
    collection_id: string;
}) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [stateCreateItem, setStateCreateItem] = useState<TCreateItemData>({
        name: data?.name || "",
        image_url: data?.image_url || "",
        collection_id: Number(collection_id),
    });

    const handleImageUrl = (value: string) => {
        setStateCreateItem({
            ...stateCreateItem,
            image_url: value,
        });
    };

    const handleCreateItem = async () => {
        setLoading(true);
        const newItem = await ItemService.create({
            ...stateCreateItem,
        });
        setLoading(false);
        router.push(`/item/${newItem.data.id}`);
    };

    const handleUpdateItem = async () => {
        setLoading(true);
        const newItem = await ItemService.update(
            {
                ...stateCreateItem,
            },
            Number(data?.id),
        );
        setLoading(false);
        router.push(`/item/${newItem.data.id}`);
        router.refresh();
    };

    return (
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
            </div>
            <div className="flex flex-col justify-between gap-5">
                <UploadImage
                    value={stateCreateItem.image_url}
                    setImageUrl={handleImageUrl}
                    folder_name="item"
                />
                <Button
                    loading={loading}
                    onClick={data ? handleUpdateItem : handleCreateItem}
                    className="dark:text-black dark:bg-white flex justify-center my-5 lg:m-0"
                >
                    {data ? "Update" : "Create"}
                </Button>
            </div>
        </section>
    );
}
