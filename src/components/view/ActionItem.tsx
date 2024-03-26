import Link from "next/link";
import TCollectionData from "@/types/collection/TCollectionData";
import { MdDelete, MdEdit } from "react-icons/md";
import CollectionService from "@/services/collection.service";
import { useRouter } from "next/navigation";
import TItemData from "@/types/item/TItemData";
import ItemService from "@/services/item.service";

export default function ActionItem({ item }: { item: TItemData }) {
    const router = useRouter();

    const handleDeleteCollection = async () => {
        await ItemService.delete(item.id).then((res) => {
            router.push(`/collection/${item.collection_id}`);
            router.refresh();
        });
    };

    return (
        <div className="flex gap-2 items-start">
            <Link href={`/item/edit/${item.id}`}>
                <MdEdit className="h-6 w-6 text-gray-500 opacity-50 hover:opacity-100 duration-300" />
            </Link>
            <button onClick={handleDeleteCollection}>
                <MdDelete className="h-6 w-6 text-red-500 opacity-50 hover:opacity-100 duration-300" />
            </button>
        </div>
    );
}
