"use client";

import { Input } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { FormEvent, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { CiSearch } from "react-icons/ci";
import { useTranslation } from "react-i18next";

export default function SearchByItems({ className }: { className?: string }) {
    const [inputValue, setInputValue] = useState("");
    const router = useRouter();
    const params = useSearchParams();
    const { t } = useTranslation();

    const handleSubmitSearch = (event: FormEvent) => {
        event.preventDefault();
        if (inputValue.length > 0) {
            router.push(`/item?search=${inputValue}`);
        }
    };

    useEffect(() => {
        setInputValue(params.get("search") || "");
    }, [params]);

    return (
        <form className={className} onSubmit={handleSubmitSearch}>
            <input
                className="w-full h-full focus:outline-none focus:dark:border-white/70 focus:border-black/70 rounded-lg text-sm px-3 pr-8 bg-transparent border dark:border-white/30 border-black/30"
                placeholder={t("layout.search_placeholder")}
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
