"use client";

import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import { useTranslation } from "react-i18next";

export default function BackButton({ backPath }: { backPath: string }) {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <Button
            onClick={() => router.push(backPath)}
            size="sm"
            className="w-24 flex items-center justify-center gap-2 dark:bg-white dark:text-black"
        >
            <IoArrowBack className="w-4 h-4" />
            {t("button_back")}
        </Button>
    );
}
