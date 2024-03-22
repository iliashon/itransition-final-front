"use client";

import UsersTable from "@/components/view/UsersTable";

export default function UsersView() {
    return (
        <main className="px-4 mt-10 gap-5">
            <h1 className="text-3xl font-semibold mb-5">Users table</h1>
            <UsersTable />
        </main>
    );
}
