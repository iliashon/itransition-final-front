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
import { MdOpenInNew } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import TUserData from "@/types/auth/TUserData";
import getUserData from "@/utils/getUserData";
import CollectionService from "@/services/collection.service";

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
        data: data || [],
        state: {
            isLoading: loading,
        },
        muiTableContainerProps: {
            sx: { height: "600px" },
        },
        enableRowActions: !!userData,
        renderRowActions: ({ row }) => {
            if (userData?.id === row.original.user_id || userData?.is_admin) {
                return (
                    <Link href={`/collection/edit/${row.original.id}`}>
                        <FaEdit className="h-5 w-5" />
                    </Link>
                );
            }
        },
    });

    return <MaterialReactTable table={table} />;
}
