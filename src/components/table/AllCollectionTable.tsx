"use client";

import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import TItemData from "@/types/item/TItemData";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import TCollectionData from "@/types/collection/TCollectionData";
import Link from "next/link";
import { MdOpenInNew } from "react-icons/md";

export default function AllCollectionTable({
    data = [],
}: {
    data?: TCollectionData[];
}) {
    const columns = useMemo<MRT_ColumnDef<TCollectionData>[]>(
        () => [
            {
                accessorKey: "id",
                header: "Link",
                size: 50,
                Cell: (props) => (
                    <Link href={`/collection/${props.row.original.id}`}>
                        <MdOpenInNew className="h-5 w-5 text-black" />
                    </Link>
                ),
            },
            {
                accessorKey: "image_url",
                header: "Image",
                size: 100,
                Cell: (props) => (
                    <Image
                        src={props.row.original.image_url}
                        alt="Image"
                        width={50}
                        height={50}
                    />
                ),
            },
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "type",
                header: "Type",
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
    });

    return <MaterialReactTable table={table} />;
}
