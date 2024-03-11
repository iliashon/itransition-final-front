import BasicIndicators from "@/components/dashboard/BasicIndicators";
import LinkCreateCollection from "@/components/button/LinkCreateCollection";

export default function Dashboard() {
    return (
        <main className="px-4 mt-10">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            <BasicIndicators />
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <div className="border col-span-4 h-[600px] rounded-2xl dark:border-white/30 border-black/30 shadow"></div>
                <div className="border col-span-3 h-[600px] rounded-2xl dark:border-white/30 border-black/30 shadow"></div>
            </div>
        </main>
    );
}
