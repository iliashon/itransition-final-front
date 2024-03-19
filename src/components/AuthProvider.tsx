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
            refresh().then(() => setLoading(false));
        } else if (PRIVATE_ROUTE_LIST.includes(pathName)) {
            setLoading(false);
            router.push("/");
        } else {
            setLoading(false);
        }
    }, [pathName]);

    return (
        <>
            {loading ? (
                <div className="h-[100vh] w-[100vw] flex flex-col justify-center items-center">
                    <ClipLoader />
                    <h2 className="mt-6">Please wait</h2>
                </div>
            ) : (
                children
            )}
        </>
    );
}
