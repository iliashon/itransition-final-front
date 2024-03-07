import SearchByItems from "@/components/input/SearchByItems";
import DrawerMenu from "@/components/layout/DrawerMenu";
import AuthModal from "@/components/auth/AuthModal";
import { Suspense } from "react";
import Logo from "@/components/layout/Logo";

export default function Header() {
    return (
        <header className="h-[65px] px-4 border-b dark:border-b-white/30 border-black/30 flex items-center justify-between gap-3">
            <Logo />
            <SearchByItems />
            <div className="flex items-center gap-4">
                <Suspense>
                    <AuthModal />
                </Suspense>
                <DrawerMenu />
            </div>
        </header>
    );
}
