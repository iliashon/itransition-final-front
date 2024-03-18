import CreateItem from "@/components/form/CreateItem";

export default function CreateItemPage({
    params,
}: {
    params: { collection_id: string };
}) {
    return (
        <main className="px-4">
            <h1 className="text-3xl font-bold py-7">Create item</h1>
            <CreateItem collection_id={params.collection_id} />
        </main>
    );
}
