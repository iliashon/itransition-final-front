import BasicIndicators from "@/components/view/BasicIndicators";
import EditProfile from "@/components/edit/EditProfile";

export default function DashboardView() {
    return (
        <main className="px-4 mt-10">
            <div className="flex justify-between">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            <BasicIndicators />
            <div className="mt-4 grid gap-4 md:grid-cols-1 lg:grid-cols-7">
                <div className="border p-7 lg:col-span-4 h-[600px] rounded-2xl dark:border-white/30 border-black/30 shadow">
                    <h2 className="font-semibold">My collection</h2>
                </div>
                <div className="border p-7 lg:col-span-3 h-[600px] rounded-2xl dark:border-white/30 border-black/30 shadow">
                    <EditProfile />
                </div>
            </div>
        </main>
    );
}
