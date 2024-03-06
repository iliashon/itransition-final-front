import NavigationLinks from "@/components/layout/NavigationLinks";
import Link from "next/link";
import SearchByItems from "@/components/input/SearchByItems";

export default function Header() {
    return (
        <header className="h-[70px] px-4 border-b dark:border-b-white/30 border-black/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-10">
                <Link
                    href="/"
                    className="text-xl border dark:border-white/30 border-black/30 px-3 py-1 rounded-lg"
                >
                    itupalski
                </Link>
                <NavigationLinks />
            </div>
            <SearchByItems />
        </header>
    );
}
