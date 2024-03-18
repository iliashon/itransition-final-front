import { notFound } from "next/navigation";
import Image from "next/image";
import ItemService from "@/services/item.service";

export default async function ItemPreview({
    params,
}: {
    params: { id: number };
}) {
    if (!isNaN(Number(params.id))) {
        const item = await ItemService.getById(Number(params.id)).then(
            (res) => res.data,
        );
        if (item === null) {
            notFound();
        }
        return (
            <section className="mx-14 grid grid-cols-2 gap-5 mt-10">
                <div className="flex flex-col gap-5">
                    <h1 className="text-5xl font-semibold">{item.name}</h1>
                </div>
                <div>
                    <Image
                        src={item.image_url}
                        alt="image"
                        className="w-full rounded-xl mb-5"
                        width={500}
                        height={500}
                    />
                </div>
            </section>
        );
    } else {
        notFound();
    }
}
