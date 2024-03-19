import { notFound } from "next/navigation";
import Image from "next/image";
import ItemService from "@/services/item.service";
import CommentBlock from "@/components/CommentBlock";
import ItemPreview from "@/components/preview/ItemPreview";

export default async function Item({ params }: { params: { id: number } }) {
    if (!isNaN(Number(params.id))) {
        const item = await ItemService.getById(Number(params.id)).then(
            (res) => res.data,
        );
        if (item === null) {
            notFound();
        }
        return (
            <section className="mx-14 mt-10">
                <ItemPreview item={item} />
                <hr />
                <CommentBlock item_id={item.id} />
            </section>
        );
    } else {
        notFound();
    }
}
