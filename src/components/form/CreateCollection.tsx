"use client";

import EditMarkdown from "@/components/markdown/EditMarkdown";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import SelectCollectionType from "@/components/select/SelectCollectionType";
import UploadImage from "@/components/input/UploadImage";
import CollectionService from "@/services/collection.service";
import TCreateCollectionData from "@/types/collection/TCreateCollectionData";

export default function CreateCollection() {
    const [loading, setLoading] = useState(false);
    const [stateCreateCollection, setStateCreateCollection] =
        useState<TCreateCollectionData>({
            name: "",
            description: "# New Collection",
            type: "",
            image_url: "",
        });

    const handleActiveCollectionType = (value: string) => {
        setStateCreateCollection({ ...stateCreateCollection, type: value });
    };

    const handleMarkdownValue = (value: string) => {
        setStateCreateCollection({
            ...stateCreateCollection,
            description: value,
        });
    };

    const handleImageUrl = (value: string) => {
        setStateCreateCollection({
            ...stateCreateCollection,
            image_url: value,
        });
    };

    const handleCreateCollection = async () => {
        setLoading(true);
        const newCollection = await CollectionService.createCollection({
            ...stateCreateCollection,
        });
        setLoading(false);
        console.log(newCollection);
    };

    return (
        <section className="relative grid lg:grid-cols-3 grid-cols-1 gap-5">
            <div className="flex flex-col gap-5 lg:col-span-2 col-auto">
                <input
                    type="text"
                    className="border dark:border-white border-black/30 bg-transparent rounded w-full h-12 px-3 text-xl focus:outline-none"
                    placeholder="Title"
                    value={stateCreateCollection.name}
                    onChange={(event) =>
                        setStateCreateCollection({
                            ...stateCreateCollection,
                            name: event.target.value,
                        })
                    }
                />
                <EditMarkdown
                    value={stateCreateCollection.description}
                    handleOnChange={handleMarkdownValue}
                />
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-5">
                    <UploadImage
                        value={stateCreateCollection.image_url}
                        setImageUrl={handleImageUrl}
                    />
                    <SelectCollectionType
                        value={stateCreateCollection.type}
                        setValue={handleActiveCollectionType}
                    />
                    <div className="border dark:border-white border-black/30 rounded h-64"></div>
                </div>
                <Button
                    loading={loading}
                    onClick={handleCreateCollection}
                    className="dark:text-black dark:bg-white flex justify-center my-5 lg:m-0"
                >
                    Create
                </Button>
            </div>
            {loading && (
                <div className="absolute left-0 top-0 h-full w-full bg-white/50 z-40"></div>
            )}
        </section>
    );
}
