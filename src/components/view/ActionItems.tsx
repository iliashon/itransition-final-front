import Link from "next/link";
import { MdDelete, MdEdit } from "react-icons/md";
import TItemData from "@/types/item/TItemData";
import { useRouter } from "next/navigation";
import ItemService from "@/services/item.service";

export default function ActionItems({
    item_id,
    collection_id,
}: {
    item_id: number;
    collection_id: number;
}) {
    const router = useRouter();
    const handleDeleteCollection = async () => {
        await ItemService.delete(item_id).then((res) => {
            router.push(`/collection/${collection_id}`);
            router.refresh();
        });
    };

    return (
        <div className="flex gap-2 items-start">
            <Link href={`/item/edit/${item_id}`}>
                <MdEdit className="h-6 w-6 text-gray-500 opacity-50 hover:opacity-100 duration-300" />
            </Link>
            <button onClick={handleDeleteCollection}>
                <MdDelete className="h-6 w-6 text-red-500 opacity-50 hover:opacity-100 duration-300" />
            </button>
        </div>
    );
}
