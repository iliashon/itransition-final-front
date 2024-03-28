import AllCollectionTable from "@/components/view/AllCollectionTable";
import BackButton from "@/components/view/BackButton";

export default function CollectionList() {
    return (
        <main className="px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold py-7">All collections</h1>
                <BackButton backPath={"/"} />
            </div>
            <AllCollectionTable />
        </main>
    );
}
