"use client";

import SearchByItems from "@/components/input/SearchByItems";
import DrawerMenu from "@/components/layout/DrawerMenu";
import AuthModal from "@/components/auth/AuthModal";
import { Suspense, useEffect, useState } from "react";
import Logo from "@/components/layout/Logo";
import TUserData from "@/types/auth/TUserData";
import getUserData from "@/utils/getUserData";
import UserMenu from "@/components/layout/UserMenu";
import Link from "next/link";
import { IoMdAdd } from "react-icons/io";
import { Button, Tooltip } from "@material-tailwind/react";
import LinkCreateCollection from "@/components/button/LinkCreateCollection";

export default function Header() {
    const [userData, setUserData] = useState<TUserData | null>();

    useEffect(() => {
        setUserData(getUserData());
    }, []);

    return (
        <header className="h-[65px] px-4 border-b dark:border-b-white/30 border-black/30 flex items-center justify-between gap-3">
            <Logo />
            <SearchByItems />
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
                <DrawerMenu />
            </div>
        </header>
    );
}
