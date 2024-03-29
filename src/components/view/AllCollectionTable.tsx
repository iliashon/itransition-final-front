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
import { mkConfig, generateCsv, download } from "export-to-csv";
import { Button } from "@material-tailwind/react";
import { MdOutlineSaveAlt } from "react-icons/md";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    filename: "collections",
    useKeysAsHeaders: true,
});

export default function AllCollectionTable() {
    const [userData, setUserData] = useState<TUserData | null>();
    const [data, setData] = useState<TCollectionData[]>([]);
    const [loading, setLoading] = useState(true);
    const theme = useTheme();
    const { t } = useTranslation();

    const getCollections = () => {
        setLoading(true);
        CollectionService.getAll().then((res) => {
            setData(res.data);
            setLoading(false);
        });
    };

    useEffect(() => {
        setUserData(getUserData());
        getCollections();
    }, []);

    const handleDownloadCsv = () => {
        const csv = generateCsv(csvConfig)(
            data.map((item) => {
                return {
                    id: item.id,
                    name: item.name,
                    image: item.image_url,
                    author: `${item.user.first_name} ${item.user.last_name}`,
                    count_item: item._count.item,
                    type: item.type,
                    created_at: new Date(item.created_at).toLocaleString(),
                    description: item.description,
                };
            }),
        );
        download(csvConfig)(csv);
    };

    const columns = useMemo<MRT_ColumnDef<TCollectionData>[]>(
        () => [
            {
                accessorKey: "name",
                header: t("table_col.name"),
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
                header: t("table_col.image"),
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
                header: t("table_col.author"),
                Cell: (props) =>
                    `${props.row.original.user.first_name} ${props.row.original.user.last_name}`,
            },
            {
                accessorKey: "_count.item",
                header: t("table_col.count_item"),
                Cell: (props) => `${props.row.original._count.item}`,
            },
            {
                accessorKey: "type",
                header: t("table_col.type"),
            },
            {
                accessorKey: "created_at",
                header: t("table_col.created_at"),
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
        mrtTheme: {
            baseBackgroundColor: theme.theme === "dark" ? "#1e1e1e" : "#fff",
        },
        renderRowActions: ({ row }) => {
            if (userData?.id === row.original.user_id || userData?.is_admin) {
                return (
                    <ActionCollection
                        onDelete={() => getCollections()}
                        collection={row.original}
                    />
                );
            }
        },
        renderTopToolbarCustomActions: (props) => {
            return (
                <Button
                    size="sm"
                    color="green"
                    className="hover:shadow-none flex items-center gap-2"
                    onClick={handleDownloadCsv}
                >
                    <MdOutlineSaveAlt className="w-4 h-4" />
                    CSV
                </Button>
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
