"use client";

import Link from "next/link";
import TTagsCloud from "@/types/tag/TTagsCloud";
import { TagCloud } from "react-tagcloud";

export default function HomeView({ tagsCloud }: { tagsCloud: TTagsCloud[] }) {
    return (
        <main className="px-4 mt-10 sm:mt-20">
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:px-10">
                <div className="flex flex-col gap-7">
                    <h1 className="text-5xl font-bold">
                        Collectible
                        <br />
                        World
                    </h1>
                    <p className="text-sm text-gray-500 w-3/4">
                        Take your collecting passion to new heights with our
                        intuitive collection app. Create your dream collection
                        now
                    </p>
                    <div className="flex gap-5 items-center">
                        <Link
                            href="/collection"
                            className="bg-black dark:bg-white dark:text-black py-2 w-40 rounded-lg text-white flex justify-center text-sm font-semibold hover:shadow duration-300"
                        >
                            Collections
                        </Link>
                        <Link
                            href="#"
                            className="border dark:border-white border-black/30 py-2 w-40 rounded-lg flex justify-center text-sm font-semibold hover:shadow duration-300"
                        >
                            Try Now
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
                />
            </section>
        </main>
    );
}