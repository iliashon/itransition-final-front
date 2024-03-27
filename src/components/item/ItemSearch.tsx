"use client";

import { useEffect, useMemo, useState } from "react";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import ItemService from "@/services/item.service";
import { TSearchItemData } from "@/types/item/TItemData";
import Image from "next/image";

export default function ItemSearch() {
    const [data, setData] = useState<TSearchItemData[]>();
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();

    useEffect(() => {
        setLoading(true);
        ItemService.search(params.get("search") || "").then((res) => {
            setData(res.data);
            setLoading(false);
        });
    }, [params]);

    const columns = useMemo<MRT_ColumnDef<TSearchItemData>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                Cell: (props) => (
                    <Link
                        href={`/item/${props.row.original.id}`}
                        className="cursor-pointer"
                    >
                        {props.row.original.name}
                    </Link>
                ),
            },
            {
                accessorKey: "image_url",
                header: "Image",
                Cell: (props) => {
                    return (
                        <Image
                            src={
                                props.row.original.image_url ||
                                "/imageNotFound.jpeg"
                            }
                            alt={props.row.original.name}
                            width={50}
                            height={50}
                        />
                    );
                },
            },
            {
                accessorKey: "collection.user.first_name",
                header: "Author",
                Cell: (props) => {
                    return `${props.row.original.collection.user.first_name} ${props.row.original.collection.user.last_name}`;
                },
            },
            {
                accessorKey: "collection.name",
                header: "Collection",
                Cell: (props) => {
                    return (
                        <Link
                            href={`/collection/${props.row.original.collection_id}`}
                        >
                            {props.row.original.collection.name}
                        </Link>
                    );
                },
            },
            {
                accessorKey: "collection.type",
                header: "Collection type",
                Cell: (props) => {
                    return props.row.original.collection.type;
                },
            },
            {
                accessorKey: "item_tag",
                header: "Tags",
                Cell: (props) => {
                    return props.row.original.item_tag.map((item) => {
                        return `${item.tag.text}, `;
                    });
                },
            },
            {
                accessorKey: "created_at",
                header: "Create time",
                Cell: (props) =>
                    new Date(props.row.original.created_at).toLocaleString(),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data: data || [],
        state: {
            isLoading: loading,
        },
        muiTableContainerProps: {
            sx: { height: "calc(100vh - 330px)" },
        },
        enableDensityToggle: false,
        enableColumnFilters: false,
        enableFilters: false,
        enableColumnActions: false,
        enableHiding: false,
    });

    return (
        <main className="px-4">
            <h1 className="font-semibold text-2xl my-5">
                Search results for: {params.get("search")}
            </h1>
            <MaterialReactTable table={table} />
        </main>
    );
}
