import Link from "next/link";
import Logo from "@/components/layout/Logo";

export default function Footer() {
    return (
        <footer className="w-full pt-5">
            <div className="p-4 border-b dark:border-b-white/30 border-black/30 flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
                <Logo />
                <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
                    <li>
                        <Link href="/" className="font-normal">
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link href="/collection" className="font-normal">
                            Collections
                        </Link>
                    </li>
                </ul>
            </div>
            <p className="text-center font-normal py-4">
                &copy; 2024 Tupalski Ilya
            </p>
        </footer>
    );
}
