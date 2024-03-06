"use client";

import { Input } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CiSearch } from "react-icons/ci";

export default function SearchByItems() {
    const [isDarkMode, setIsDarkMode] = useState<boolean>();
    const [inputValue, setInputValue] = useState("");
    const { theme } = useTheme();
    const router = useRouter();

    const handleSubmitSearch = (event: FormEvent) => {
        event.preventDefault();
        if (inputValue.length > 0) {
            setInputValue("");
            router.push(`/items?search=${inputValue}`);
        }
    };

    useEffect(() => {
        setIsDarkMode(localStorage.getItem("theme") === "dark");
    }, [theme]);

    return (
        <form
            className="w-[300px] h-[36px] relative hidden lg:block"
            onSubmit={handleSubmitSearch}
        >
            <input
                className="w-full h-full focus:outline-none focus:dark:border-white/70 focus:border-black/70 rounded-lg text-sm px-3 pr-8 bg-transparent border dark:border-white/30 border-black/30"
                placeholder="Search..."
                value={inputValue}
                onChange={(event) => setInputValue(event.target.value)}
            />
            <button
                type="submit"
                className="absolute right-0 top-0 h-full w-9 flex items-center justify-center"
            >
                <CiSearch className="h-5 w-5 hover:scale-110 duration-300" />
            </button>
        </form>
    );
}
