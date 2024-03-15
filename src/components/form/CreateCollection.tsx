"use client";

import EditMarkdown from "@/components/markdown/EditMarkdown";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import SelectCollectionType from "@/components/select/SelectCollectionType";
import UploadImage from "@/components/input/UploadImage";
import uploadImage from "@/serverActions/uploadImage";
import CollectionService from "@/services/collection.service";

export default function CreateCollection() {
    const [activeCollectionType, setActiveCollectionType] = useState<string>();
    const [markdownValue, setMarkdownValue] =
        useState<string>("# New Collection");
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [title, setTitle] = useState<string>("");

    const handleActiveCollectionType = (value: string | undefined) => {
        setActiveCollectionType(value);
    };

    const handleMarkdownValue = (value: string) => {
        setMarkdownValue(value);
    };

    const handleImageFile = (file: File) => {
        setImageFile(file);
    };

    const handleCreateCollection = async () => {
        const fileFormData = new FormData();
        fileFormData.append("file", imageFile!);
        const publicImageUrl = await uploadImage(fileFormData);
        const newCollection = await CollectionService.createCollection({
            name: title,
            description: markdownValue,
            type: activeCollectionType as string,
            image_url: publicImageUrl || "",
        });
        console.log(newCollection);
    };

    return (
        <section className="grid lg:grid-cols-3 grid-cols-1 gap-5">
            <div className="flex flex-col gap-5 lg:col-span-2 col-auto">
                <input
                    type="text"
                    className="border dark:border-white border-black/30 bg-transparent rounded w-full h-12 px-3 text-xl focus:outline-none"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <EditMarkdown
                    value={markdownValue}
                    setValue={handleMarkdownValue}
                />
            </div>
            <div className="flex flex-col justify-between">
                <div className="flex flex-col gap-5">
                    <UploadImage
                        fileValue={imageFile}
                        setFileValue={handleImageFile}
                    />
                    <SelectCollectionType
                        value={activeCollectionType}
                        setValue={handleActiveCollectionType}
                    />
                    <div className="border dark:border-white border-black/30 rounded h-64"></div>
                </div>
                <Button
                    onClick={handleCreateCollection}
                    className="dark:text-black dark:bg-white my-5 lg:m-0"
                >
                    Create
                </Button>
            </div>
        </section>
    );
}
