"use client";

import { useEffect, useMemo, useState } from "react";
import TUserData from "@/types/user/TUserData";
import TCollectionData from "@/types/collection/TCollectionData";
import getUserData from "@/utils/getUserData";
import CollectionService from "@/services/collection.service";
import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import Link from "next/link";
import Image from "next/image";
import ActionCollection from "@/components/view/ActionCollection";

export default function DashboardView() {
    const [data, setData] = useState<TCollectionData[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        CollectionService.getUserCollections().then((res) => {
            setData(res.data);
            setLoading(false);
        });
    }, []);

    const columns = useMemo<MRT_ColumnDef<TCollectionData>[]>(
        () => [
            {
                accessorKey: "name",
                header: "Name",
                size: 70,
                Cell: (props) => (
                    <Link
                        href={`/collection/${props.row.original.id}`}
                        className="cursor-alias"
                    >
                        {props.row.original.name}
                    </Link>
                ),
            },
            {
                accessorKey: "image_url",
                header: "Image",
                size: 100,
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
            {
                accessorKey: "_count.item",
                header: "Count item",
                Cell: (props) => `${props.row.original._count.item}`,
            },
            {
                accessorKey: "type",
                header: "Type",
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
            sx: { height: "calc(100vh - 420px)" },
        },
        enableDensityToggle: false,
        enableColumnFilters: false,
        enableFilters: false,
        enableColumnActions: false,
        enableHiding: false,
        enableRowActions: true,
        renderRowActions: ({ row }) => {
            return <ActionCollection collection={row.original} />;
        },
        renderTopToolbarCustomActions: (props) => (
            <h2 className="font-bold text-xl p-3">My collections</h2>
        ),
    });
    return (
        <main className="px-4 mt-10">
            <div className="flex justify-between mb-5">
                <h1 className="text-3xl font-bold">Dashboard</h1>
            </div>
            <MaterialReactTable table={table} />
        </main>
    );
}
