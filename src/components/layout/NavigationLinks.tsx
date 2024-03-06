"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAVIGATION_LIST = [
    {
        name: "Collections",
        href: "/collections",
    },
    {
        name: "Items",
        href: "/items",
    },
];

export default function NavigationLinks() {
    const pathName = usePathname();

    return (
        <ul className="hidden lg:flex gap-3 text-sm font-normal">
            {NAVIGATION_LIST.map((navItem) => {
                return (
                    <Link
                        href={navItem.href}
                        key={navItem.name}
                        className={`hover:opacity-100 duration-300 ${pathName === navItem.href ? "opacity-100" : "opacity-50"}`}
                    >
                        {navItem.name}
                    </Link>
                );
            })}
        </ul>
    );
}
