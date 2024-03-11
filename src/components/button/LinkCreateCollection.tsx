"use client";

import { Button, Tooltip } from "@material-tailwind/react";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";

export default function LinkCreateCollection() {
    return (
        <Link href="#">
            <Tooltip
                content="Create collection"
                placement="left"
                className="dark:bg-white dark:text-black"
            >
                <Button
                    className="rounded-full p-1 bg-transparent border"
                    size="sm"
                >
                    <IoMdAdd className="h-6 w-6 dark:text-white text-black" />
                </Button>
            </Tooltip>
        </Link>
    );
}
