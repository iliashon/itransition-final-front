"use client";

import { ReactNode, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ClipLoader } from "react-spinners";
import useAuth from "@/hooks/useAuth";
import { PRIVATE_ROUTE_LIST } from "@/configs/private.routes.config";
import { Alert } from "@material-tailwind/react";

export default function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string>();
    const router = useRouter();
    const pathName = usePathname();
    const { refresh } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            refresh().then(() => setLoading(false));
        } else if (
            !!PRIVATE_ROUTE_LIST.find((route) => {
                return pathName.includes(route);
            })
        ) {
            setLoading(false);
            router.push("/");
        } else {
            setLoading(false);
        }
        if (localStorage.getItem("authError")) {
            setError(localStorage.getItem("authError")!);
            setTimeout(() => {
                localStorage.removeItem("authError");
                setError(undefined);
            }, 5000);
        }
    }, [pathName]);

    return (
        <>
            {error && (
                <Alert
                    className="absolute left-2 bottom-2 text-sm py-3 w-1/2 z-10"
                    color="red"
                >
                    {error}
                </Alert>
            )}
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
