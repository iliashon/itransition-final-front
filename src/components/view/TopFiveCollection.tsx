"use client";

import Link from "next/link";
import TCollectionData from "@/types/collection/TCollectionData";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import CollectionService from "@/services/collection.service";
import SkeletonLoadingHome from "@/components/view/SkeletonLoadingHome";

export default function TopFiveCollection() {
    const { t } = useTranslation();
    const [collections, setCollections] = useState<TCollectionData[]>([]);

    useEffect(() => {
        CollectionService.getTop().then((res) => setCollections(res.data));
    }, []);

    if (!collections.length) {
        return <SkeletonLoadingHome />;
    }

    return (
        <section className="px-0 h-[600px] lg:px-10 pt-10 grid lg:grid-cols-3 lg:grid-rows-2 grid-cols-1 gap-5">
            {collections.map((collection, index) => {
                if (index === 0) {
                    return (
                        <article
                            key={collection.id}
                            className="row-span-2 h-60 lg:h-full w-full overflow-hidden rounded-lg relative"
                        >
                            <img
                                src={
                                    collection.image_url ||
                                    "/imageNotFound.jpeg"
                                }
                                alt={collection.name}
                                className="h-full w-full object-cover object-center"
                            />
                            <div className="absolute z-10 bottom-10 left-5 flex flex-col items-start gap-5">
                                <h2 className="font-bold text-2xl text-white">
                                    {collection.name}
                                </h2>
                                <Link
                                    href={`/collection/${collection.id}`}
                                    className="uppercase font-semibold text-[12px] text-white text-center bg-black dark:bg-white dark:text-black duration-300 rounded-lg py-2 px-3"
                                >
                                    {t("home.button_read_more")}
                                </Link>
                            </div>
                            <div className="absolute bg-black/50 hover:bg-black/30 duration-200 top-0 bottom-0 left-0 right-0"></div>
                        </article>
                    );
                }
                return (
                    <article
                        key={collection.id}
                        className="h-60 lg:h-full w-full overflow-hidden rounded-lg bg-white relative"
                    >
                        <img
                            src={collection.image_url || "/imageNotFound.jpeg"}
                            alt={collection.name}
                            className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute z-10 bottom-10 left-5 flex flex-col items-start gap-5">
                            <h2 className="font-bold text-2xl text-white">
                                {collection.name}
                            </h2>
                            <Link
                                href={`/collection/${collection.id}`}
                                className="uppercase font-semibold text-[12px] text-white text-center bg-black dark:bg-white dark:text-black duration-300 rounded-lg py-2 px-3"
                            >
                                {t("home.button_read_more")}
                            </Link>
                        </div>
                        <div className="absolute bg-black/50 hover:bg-black/30 duration-200 top-0 bottom-0 left-0 right-0"></div>
                    </article>
                );
            })}
        </section>
    );
}
