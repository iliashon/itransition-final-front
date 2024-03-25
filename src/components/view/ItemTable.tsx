"use client";

import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import TItemData from "@/types/item/TItemData";
import { useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";
import { Button } from "@material-tailwind/react";

export default function ItemTable({
    data = [],
    editAction,
    collection_id,
}: {
    data?: TItemData[];
    editAction: boolean;
    collection_id: number;
}) {
    const columns = useMemo<MRT_ColumnDef<TItemData>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                Cell: (props) => (
                    <Link
                        href={`/item/${props.row.original.id}`}
                        className="cursor-alias"
                    >
                        {props.row.original.name}
                    </Link>
                ),
            },
            {
                accessorKey: "image_url",
                header: "Image",
                Cell: (props) => (
                    <Image
                        src={
                            props.row.original.image_url ||
                            "/imageNotFound.jpeg"
                        }
                        alt="Image"
                        width={50}
                        height={50}
                    />
                ),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enablePagination: true,
        renderTopToolbarCustomActions: (props) => {
            return (
                editAction && (
                    <Link
                        href={`/item/create/${collection_id}`}
                        className="bg-gray-600 py-2 rounded-lg text-sm px-4 text-white"
                    >
                        Create Item
                    </Link>
                )
            );
        },
    });

    return <MaterialReactTable table={table} />;
}
