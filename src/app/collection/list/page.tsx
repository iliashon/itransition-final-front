import AllCollectionTable from "@/components/table/AllCollectionTable";
import CollectionService from "@/services/collection.service";

export default async function CollectionList() {
    const collectionList = await CollectionService.getAll().then(
        (res) => res.data,
    );

    return (
        <main className="px-4">
            <h1 className="text-3xl font-bold py-7">All collections</h1>
            <AllCollectionTable data={collectionList} />
        </main>
    );
}
