import Image from "next/image";
import TItemData from "@/types/item/TItemData";

export default function ItemPreview({ item }: { item: TItemData }) {
    return (
        <div className="grid grid-cols-2 gap-5">
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
        </div>
    );
}
