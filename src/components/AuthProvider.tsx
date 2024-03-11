"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import useAuth from "@/hooks/useAuth";
import PRIVATE_ROUTE_LIST from "@/configs/private.routes.config";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathName = usePathname();
    const { refresh } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            refresh();
        }
        if (
            !localStorage.getItem("token") &&
            PRIVATE_ROUTE_LIST.includes(pathName)
        ) {
            router.push("/");
        }
        setLoading(false);
    }, []);

    return <>{loading ? <ClipLoader /> : children}</>;
}
