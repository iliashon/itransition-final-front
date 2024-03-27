"use client";

import TItemData from "@/types/item/TItemData";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import TCreateItemData from "@/types/item/TCreateItemData";
import { Tag } from "react-tag-input";
import ItemService from "@/services/item.service";
import InputTags from "@/components/edit/InputTags";
import UploadImage from "@/components/edit/UploadImage";
import { Alert, Button } from "@material-tailwind/react";
import BackButton from "@/components/view/BackButton";
import TCollectionData from "@/types/collection/TCollectionData";
import AttributeInputs from "@/components/edit/AttributeInputs";
import TAttributeValue from "@/types/item/TAttributeValue";

export default function ItemEdit({
    collection,
    data,
}: {
    collection: TCollectionData;
    data?: TItemData;
}) {
    const router = useRouter();
    const [error, setError] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);
    const [state, setState] = useState<TCreateItemData>({
        name: data?.name || "",
        image_url: data?.image_url || null,
        collection_id: collection.id,
        tags: [],
        attributes: collection.attribute.map((atr) => {
            return {
                value: undefined,
                atr_id: atr.id,
                type: atr.type,
                name: atr.name,
                require: atr.require,
            };
        }),
    });

    useEffect(() => {
        if (data?.attributes.length) {
            console.log(data.attributes);
            const setValueAtr: TAttributeValue[] = state.attributes.map(
                (atr) => {
                    const search = data.attributes.filter((atrValue) => {
                        return atrValue.atr_id === atr.atr_id;
                    });
                    return {
                        name: atr.name,
                        type: atr.type,
                        atr_id: atr.atr_id,
                        value:
                            atr.type === "date"
                                ? search[0]?.value.toString().slice(0, 10)
                                : search[0]?.value,
                        require: atr.require,
                    };
                },
            );
            setState({
                ...state,
                attributes: setValueAtr,
            });
        }
    }, []);

    const handleImage = (value: string) => {
        setState({
            ...state,
            image_url: value,
        });
    };

    const handleTags = (value: Tag[]) => {
        setState({
            ...state,
            tags: value,
        });
    };

    const validation = (): boolean => {
        if (state.name.length < 2) {
            setError("Title required field");
            return true;
        }
        for (let i = 0; i < state.attributes.length; i++) {
            if (
                state.attributes[i].require &&
                state.attributes[i].value?.toString().length === 0
            ) {
                setError(`${state.attributes[i].name} required field`);
                return true;
            }
        }
        return false;
    };

    const handleUploadItem = async () => {
        setLoading(true);
        if (validation()) {
            setLoading(false);
            return;
        }
        if (data) {
            const item = await ItemService.update(
                {
                    ...state,
                },
                Number(data?.id),
            ).then((res) => router.push(`/item/${res.data.id}`));
        } else {
            const item = await ItemService.create({
                ...state,
            }).then((res) => router.push(`/item/${res.data.id}`));
        }
        setLoading(false);
        router.refresh();
    };

    return (
        <main className="px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold py-7">
                    {data ? "Edit item" : "Create item"}
                </h1>
                <BackButton />
            </div>
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
                    <InputTags setTags={handleTags} tags={data?.tags} />
                    <AttributeInputs state={state} setState={setState} />
                </div>
                <div className="flex flex-col justify-between gap-5">
                    <UploadImage
                        value={state.image_url}
                        setValue={handleImage}
                        folder_name="item"
                    />
                    <div className="flex flex-col gap-5">
                        {error && (
                            <Alert color="red" className="py-2 text-sm">
                                {error}
                            </Alert>
                        )}
                        <Button
                            loading={loading}
                            onClick={handleUploadItem}
                            className="dark:text-black dark:bg-white flex justify-center my-5 lg:m-0"
                        >
                            {data ? "Update" : "Create"}
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    );
}
