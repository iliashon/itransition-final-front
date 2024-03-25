"use client";

import Link from "next/link";
import TCollectionData from "@/types/collection/TCollectionData";

export default function TopFiveCollection({
    data,
}: {
    data: TCollectionData[];
}) {
    return (
        <section className="px-10 pt-10 grid grid-cols-5 gap-5">
            {data.map((collection) => {
                return (
                    <article key={collection.id}>
                        <div className="h-48 w-full overflow-hidden rounded-lg bg-white">
                            <img
                                src={
                                    collection.image_url ||
                                    "/imageNotFound.jpeg"
                                }
                                alt={collection.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-5 mt-5">
                            <h2 className="font-bold text-2xl">
                                {collection.name}
                            </h2>
                            <Link
                                href={`/collection/${collection.id}`}
                                className="uppercase font-semibold text-[12px] text-white text-center bg-black dark:bg-white dark:text-black duration-300 rounded-lg py-2 px-3"
                            >
                                Read more
                            </Link>
                        </div>
                    </article>
                );
            })}
        </section>
    );
}
