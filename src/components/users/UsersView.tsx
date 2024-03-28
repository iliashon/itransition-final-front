"use client";

import UsersTable from "@/components/view/UsersTable";
import { useEffect, useState } from "react";
import TUserData from "@/types/user/TUserData";
import getUserData from "@/utils/getUserData";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function UsersView() {
    const [userData, setUserData] = useState<TUserData | null>();
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(() => {
        if (
            !localStorage.getItem("userData") ||
            !JSON.parse(localStorage.getItem("userData")!).is_admin
        ) {
            router.push("/");
        }
        setUserData(getUserData());
    }, []);

    return (
        <main className="px-4 mt-10 gap-5">
            <h1 className="text-3xl font-semibold mb-5">
                {t("users_table.title")}
            </h1>
            {userData && <UsersTable userData={userData} />}
        </main>
    );
}
