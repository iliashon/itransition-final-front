"use client";

import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import TItemData from "@/types/item/TItemData";
import { useMemo } from "react";
import Image from "next/image";

export default function ItemTable({ data = [] }: { data?: TItemData[] }) {
    const columns = useMemo<MRT_ColumnDef<TItemData>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
            },
            {
                accessorKey: "image_url",
                header: "Image",
                Cell: (props) => (
                    <Image
                        src={props.row.original.image_url}
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
    });

    return <MaterialReactTable table={table} />;
}
