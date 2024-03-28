"use client";

import BackButton from "@/components/view/BackButton";
import AllCollectionTable from "@/components/view/AllCollectionTable";
import { useTranslation } from "react-i18next";

export default function AllCollectionsView() {
    const { t } = useTranslation();
    return (
        <main className="px-4">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold py-7">
                    {t("all_collection.title")}
                </h1>
                <BackButton backPath={"/"} />
            </div>
            <AllCollectionTable />
        </main>
    );
}
