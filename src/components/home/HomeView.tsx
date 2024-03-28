"use client";

import Link from "next/link";
import TTagsCloud from "@/types/tag/TTagsCloud";
import { TagCloud } from "react-tagcloud";
import TopFiveCollection from "@/components/view/TopFiveCollection";
import TCollectionData from "@/types/collection/TCollectionData";
import TItemData from "@/types/item/TItemData";
import LastItems from "@/components/view/LastItems";
import { useTranslation } from "react-i18next";

export default function HomeView({
    tagsCloud,
    topCollection,
    lastItems,
}: {
    tagsCloud: TTagsCloud[];
    topCollection: TCollectionData[];
    lastItems: TItemData[];
}) {
    const { t } = useTranslation();

    return (
        <main className="px-4 mt-10 sm:mt-20">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:px-10">
                <div className="flex flex-col gap-7">
                    <h1 className="text-5xl font-bold">{t("home.title")}</h1>
                    <p className="text-sm text-gray-500 w-3/4">
                        {t("home.description")}
                    </p>
                    <div className="flex gap-5 items-center">
                        <Link
                            href="/collection"
                            className="bg-black dark:bg-white dark:text-black py-2 w-40 rounded-lg text-white flex justify-center text-sm font-semibold hover:shadow duration-300"
                        >
                            {t("home.button_collections")}
                        </Link>
                    </div>
                </div>
                <TagCloud
                    className="flex flex-wrap"
                    tags={tagsCloud}
                    maxSize={50}
                    minSize={20}
                    shuffle
                    colorOptions={{ luminosity: "light", hue: "monochrome" }}
                    renderer={(tag, size, color) => (
                        <Link
                            href={`/item?search=${tag.value}`}
                            key={tag.value}
                            prefetch={false}
                            style={{
                                fontSize: size,
                                color: color,
                            }}
                            className="hover:scale-110 duration-300 hover:!text-black dark:hover:!text-white"
                        >
                            {tag.value}
                        </Link>
                    )}
                />
            </section>
            <hr className="my-10" />
            <h2 className="font-bold text-3xl text-center">
                {t("home.title_top_collection")}
            </h2>
            <TopFiveCollection data={topCollection} />
            <hr className="my-10" />
            <h2 className="font-bold text-3xl text-center">
                {t("home.title_last_items")}
            </h2>
            <LastItems data={lastItems} />
        </main>
    );
}
