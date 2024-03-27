import Link from "next/link";
import TCollectionData from "@/types/collection/TCollectionData";
import { MdDelete, MdEdit } from "react-icons/md";
import CollectionService from "@/services/collection.service";
import { useRouter } from "next/navigation";

export default function ActionCollection({
    collection,
    onDelete,
}: {
    collection: TCollectionData;
    onDelete?: () => void;
}) {
    const router = useRouter();

    const handleDeleteCollection = async () => {
        await CollectionService.delete(collection.id).then((res) => {
            router.push("/collection");
            router.refresh();
            if (onDelete) {
                onDelete();
            }
        });
    };

    return (
        <div className="flex gap-2 items-start">
            <Link href={`/collection/edit/${collection.id}`}>
                <MdEdit className="h-6 w-6 text-gray-500 opacity-50 hover:opacity-100 duration-300" />
            </Link>
            <button onClick={handleDeleteCollection}>
                <MdDelete className="h-6 w-6 text-red-500 opacity-50 hover:opacity-100 duration-300" />
            </button>
        </div>
    );
}
