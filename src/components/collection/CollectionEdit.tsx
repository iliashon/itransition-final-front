"use client";

import TCollectionData from "@/types/collection/TCollectionData";
import { useState } from "react";
import { useRouter } from "next/navigation";
import TCreateCollectionData from "@/types/collection/TCreateCollectionData";
import CollectionService from "@/services/collection.service";
import UploadImage from "@/components/edit/UploadImage";
import SelectCollectionType from "@/components/edit/SelectCollectionType";
import { Button } from "@material-tailwind/react";
import MarkdownEditor from "@uiw/react-markdown-editor";

export default function CollectionEdit({ data }: { data?: TCollectionData }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<TCreateCollectionData>({
        name: data?.name || "",
        description: data?.description || "# New Collection",
        type: data?.type || "",
        image_url: data?.image_url || "",
    });

    const handleType = (value: string) => {
        setState({ ...state, type: value });
    };

    const handleMarkdown = (value: string) => {
        setState({
            ...state,
            description: value,
        });
    };

    const handleImage = (value: string) => {
        setState({
            ...state,
            image_url: value,
        });
    };

    const handleUploadCollection = async () => {
        setLoading(true);
        if (data) {
            await CollectionService.update(
                {
                    ...state,
                },
                data.id,
            ).then((res) => router.push(`/collection/${res.data.id}`));
        } else {
            await CollectionService.create({
                ...state,
            }).then((res) => router.push(`/collection/${res.data.id}`));
        }
        setLoading(false);
        router.refresh();
    };

    return (
        <main className="px-4">
            <h1 className="text-3xl font-bold py-7">
                {data ? "Edit collection" : "Create collection"}
            </h1>
            <section className="relative grid lg:grid-cols-3 grid-cols-1 gap-5">
                <div className="flex flex-col gap-5 lg:col-span-2 col-auto">
                    <input
                        type="text"
                        className="border dark:border-white border-black/30 bg-transparent rounded w-full h-12 px-3 text-xl focus:outline-none"
                        placeholder="Title"
                        value={state.name}
                        onChange={(event) =>
                            setState({
                                ...state,
                                name: event.target.value,
                            })
                        }
                    />
                    <MarkdownEditor
                        visible={true}
                        className="h-[73vh]"
                        value={state.description}
                        onChange={handleMarkdown}
                    />
                </div>
                <div className="flex flex-col justify-between">
                    <div className="flex flex-col gap-5">
                        <UploadImage
                            value={state.image_url}
                            setValue={handleImage}
                            folder_name="collection"
                        />
                        <SelectCollectionType
                            value={state.type}
                            setValue={handleType}
                        />
                        <div className="border dark:border-white border-black/30 rounded h-64"></div>
                    </div>
                    <Button
                        loading={loading}
                        onClick={handleUploadCollection}
                        className="dark:text-black dark:bg-white flex justify-center my-5 lg:m-0"
                    >
                        Send
                    </Button>
                </div>
                {loading && (
                    <div className="absolute left-0 top-0 h-full w-full bg-white/50 z-40"></div>
                )}
            </section>
        </main>
    );
}
