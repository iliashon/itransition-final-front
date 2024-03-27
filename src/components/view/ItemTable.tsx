"use client";

import {
    MaterialReactTable,
    MRT_ColumnDef,
    useMaterialReactTable,
} from "material-react-table";
import TItemData from "@/types/item/TItemData";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TUserData from "@/types/user/TUserData";
import TCollectionData from "@/types/collection/TCollectionData";
import getUserData from "@/utils/getUserData";
import ActionItems from "@/components/view/ActionItems";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";

export default function ItemTable({
    data = [],
    editAction,
    collection,
}: {
    data?: TItemData[];
    editAction: boolean;
    collection: TCollectionData;
}) {
    const [userData, setUserData] = useState<TUserData | null>();
    const theme = useTheme();

    useEffect(() => {
        setUserData(getUserData());
    }, []);

    const columns = useMemo<MRT_ColumnDef<TItemData>[]>(
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
                accessorKey: "created_at",
                header: "Created time",
                Cell: (props) =>
                    new Date(props.row.original.created_at).toLocaleString(),
            },
        ],
        [],
    );

    const table = useMaterialReactTable({
        columns,
        data,
        enablePagination: true,
        enableRowActions: !!userData,
        mrtTheme: {
            baseBackgroundColor: theme.theme === "dark" ? "#1e1e1e" : "#fff",
        },
        renderRowActions: ({ row }) => {
            if (userData?.id === collection.user_id || userData?.is_admin) {
            }
            return <ActionItems item={row.original} />;
        },
        renderTopToolbarCustomActions: (props) => {
            return (
                editAction && (
                    <Link
                        href={`/item/create/${collection.id}`}
                        className="bg-gray-600 py-2 rounded-lg text-sm px-4 text-white"
                    >
                        Create Item
                    </Link>
                )
            );
        },
    });

    return (
        <ThemeProvider
            theme={createTheme({
                palette: {
                    mode: theme.theme === "dark" ? "dark" : "light",
                },
            })}
        >
            <MaterialReactTable table={table} />
        </ThemeProvider>
    );
}
