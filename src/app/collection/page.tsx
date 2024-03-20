import AllCollectionTable from "@/components/view/AllCollectionTable";

export default function CollectionList() {
    return (
        <main className="px-4">
            <h1 className="text-3xl font-bold py-7">All collections</h1>
            <AllCollectionTable />
        </main>
    );
}
