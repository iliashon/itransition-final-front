import TItemData from "@/types/item/TItemData";
import Link from "next/link";

export default function LastItems({ data }: { data: TItemData[] }) {
    return (
        <section className="px-10 pt-10 grid grid-cols-5 gap-5">
            {data.map((item) => {
                return (
                    <article key={item.id}>
                        <div className="h-48 w-full overflow-hidden rounded-lg bg-white">
                            <img
                                src={item.image_url || "/imageNotFound.jpeg"}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                            />
                        </div>
                        <div className="flex flex-col items-start gap-5 mt-5">
                            <h2 className="font-bold text-2xl">{item.name}</h2>
                            <Link
                                href={`/item/${item.id}`}
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
