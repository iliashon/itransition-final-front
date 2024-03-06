import NavigationLinks from "@/components/layout/NavigationLinks";
import Link from "next/link";
import SearchByItems from "@/components/input/SearchByItems";
import SettingMenu from "@/components/layout/SettingMenu";
import { MdOutlineLogin } from "react-icons/md";
import { useState } from "react";
import { Button } from "@material-tailwind/react";
import { HiMenuAlt1 } from "react-icons/hi";
import DrawerMenu from "@/components/layout/DrawerMenu";

export default function Header() {
    return (
        <header className="h-[65px] px-4 border-b dark:border-b-white/30 border-black/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-10">
                <Link
                    href="/"
                    className="text-xl border dark:border-white/30 border-black/30 px-3 py-1 rounded-lg"
                >
                    itupalski
                </Link>
                <NavigationLinks />
            </div>
            <div className="flex items-center gap-4">
                <SearchByItems />
                <SettingMenu />
                <DrawerMenu />
                <Link
                    href="/login"
                    className="hidden lg:flex text-sm font-medium border dark:border-white/30 border-black/30 hover:opacity-70 duration-300 px-3 py-2 rounded-lg items-center gap-2"
                >
                    Login
                    <MdOutlineLogin className="h-4 w-4" />
                </Link>
            </div>
        </header>
    );
}
