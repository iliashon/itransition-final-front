"use client";

import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

export default function BackButton() {
    const router = useRouter();

    return (
        <Button
            onClick={() => router.back()}
            size="sm"
            className="w-24 flex items-center justify-center gap-2 dark:bg-white dark:text-black"
        >
            <IoArrowBack className="w-4 h-4" />
            Back
        </Button>
    );
}
