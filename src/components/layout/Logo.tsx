import Link from "next/link";

export default function Logo() {
    return (
        <Link
            href="/"
            className="text-xl border dark:border-white/30 border-black/30 px-3 py-1 rounded-lg"
        >
            itupalski
        </Link>
    );
}
