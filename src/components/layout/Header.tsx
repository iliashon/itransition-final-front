"use client";

import SearchByItems from "@/components/layout/SearchByItems";
import DrawerMenu from "@/components/layout/DrawerMenu";
import AuthModal from "@/components/auth/AuthModal";
import { Suspense, useEffect, useState } from "react";
import Logo from "@/components/layout/Logo";
import TUserData from "@/types/user/TUserData";
import getUserData from "@/utils/getUserData";
import UserMenu from "@/components/layout/UserMenu";
import LinkCreateCollection from "@/components/layout/LinkCreateCollection";

export default function Header() {
    const [userData, setUserData] = useState<TUserData | null>();

    useEffect(() => {
        setUserData(getUserData());
    }, []);

    return (
        <header className="h-[65px] px-4 border-b dark:border-b-white/30 border-black/30 flex items-center justify-between gap-3">
            <Logo />
            <SearchByItems className="w-1/3 h-[36px] relative hidden lg:block" />
            <div className="flex items-center gap-4">
                {userData ? (
                    <>
                        <LinkCreateCollection />
                        <UserMenu userData={userData} />
                    </>
                ) : (
                    <Suspense fallback="loading">
                        <AuthModal />
                    </Suspense>
                )}
                <DrawerMenu userData={userData || undefined} />
            </div>
        </header>
    );
}
