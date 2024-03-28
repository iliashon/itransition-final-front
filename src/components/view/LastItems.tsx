import TItemData from "@/types/item/TItemData";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function LastItems({ data }: { data: TItemData[] }) {
    const { t } = useTranslation();

    return (
        <section className="px-0 lg:px-10 pt-10 grid lg:grid-cols-3 lg:grid-rows-2 grid-cols-1 gap-5">
            {data.map((item, index) => {
                if (index === 2) {
                    return (
                        <article
                            key={item.id}
                            className="row-span-2 h-60 lg:h-full w-full overflow-hidden rounded-lg relative"
                        >
                            <img
                                src={item.image_url || "/imageNotFound.jpeg"}
                                alt={item.name}
                                className="h-full w-full object-cover object-center"
                            />
                            <div className="absolute z-10 bottom-10 left-5 flex flex-col items-start gap-5">
                                <h2 className="font-bold text-2xl text-white">
                                    {item.name}
                                </h2>
                                <Link
                                    href={`/item/${item.id}`}
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
                        key={item.id}
                        className="h-60 w-full overflow-hidden rounded-lg bg-white relative"
                    >
                        <img
                            src={item.image_url || "/imageNotFound.jpeg"}
                            alt={item.name}
                            className="h-full w-full object-cover object-center"
                        />
                        <div className="absolute z-10 bottom-10 left-5 flex flex-col items-start gap-5">
                            <h2 className="font-bold text-2xl text-white">
                                {item.name}
                            </h2>
                            <Link
                                href={`/item/${item.id}`}
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
