import Link from "next/link";
import SearchByItems from "@/components/input/SearchByItems";
import SettingMenu from "@/components/layout/SettingMenu";
import DrawerMenu from "@/components/layout/DrawerMenu";
import AuthModal from "@/components/auth/AuthModal";
import { Suspense } from "react";

export default function Header() {
    return (
        <header className="h-[65px] px-4 border-b dark:border-b-white/30 border-black/30 flex items-center justify-between gap-3">
            <Link
                href="/"
                className="text-xl border dark:border-white/30 border-black/30 px-3 py-1 rounded-lg"
            >
                itupalski
            </Link>
            <SearchByItems />
            <div className="flex items-center gap-4">
                <SettingMenu />
                <DrawerMenu />
                <Suspense>
                    <AuthModal />
                </Suspense>
            </div>
        </header>
    );
}
