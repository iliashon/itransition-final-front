"use client";

import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import TCollectionData from "@/types/collection/TCollectionData";
import Link from "next/link";
import TUserData from "@/types/user/TUserData";
import getUserData from "@/utils/getUserData";
import CollectionService from "@/services/collection.service";
import ActionCollection from "@/components/view/ActionCollection";

export default function AllCollectionTable() {
    const [userData, setUserData] = useState<TUserData | null>();
    const [data, setData] = useState<TCollectionData[]>();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setUserData(getUserData());
        CollectionService.getAll().then((res) => {
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
                        className="cursor-pointer"
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
                accessorKey: "user",
                header: "Author",
                Cell: (props) =>
                    `${props.row.original.user.first_name} ${props.row.original.user.last_name}`,
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
            sx: { height: "calc(100vh - 290px)" },
        },
        enableDensityToggle: false,
        enableColumnFilters: false,
        enableFilters: false,
        enableColumnActions: false,
        enableHiding: false,
        enableRowActions: !!userData,
        renderRowActions: ({ row }) => {
            if (userData?.id === row.original.user_id || userData?.is_admin) {
                return <ActionCollection collection={row.original} />;
            }
        },
    });

    return <MaterialReactTable table={table} />;
}
