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
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export default function ItemSearch() {
    const [data, setData] = useState<TSearchItemData[]>();
    const [loading, setLoading] = useState(true);
    const params = useSearchParams();
    const theme = useTheme();
    const { t } = useTranslation();

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
                header: t("table_col.name"),
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
                header: t("table_col.image"),
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
                header: t("table_col.author"),
                Cell: (props) => {
                    return `${props.row.original.collection.user.first_name} ${props.row.original.collection.user.last_name}`;
                },
            },
            {
                accessorKey: "collection.name",
                header: t("table_col.collection"),
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
                header: t("table_col.collection_type"),
                Cell: (props) => {
                    return props.row.original.collection.type;
                },
            },
            {
                accessorKey: "item_tag",
                header: t("table_col.tags"),
                Cell: (props) => {
                    return (
                        <div className="w-full flex gap-1 flex-wrap">
                            {props.row.original.item_tag.map((item) => {
                                return (
                                    <Link
                                        href={`/item?search=${item.tag.text}`}
                                        className="border dark:border-white/50 border-black/50 px-2 py-1 rounded-lg hover:scale-95 duration-300"
                                        key={item.tag.id}
                                    >
                                        {item.tag.text}
                                    </Link>
                                );
                            })}
                        </div>
                    );
                },
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
            sx: { height: "calc(100vh - 330px)" },
        },
        enableDensityToggle: false,
        enableColumnFilters: false,
        enableFilters: false,
        enableColumnActions: false,
        enableHiding: false,
        mrtTheme: {
            baseBackgroundColor: theme.theme === "dark" ? "#1e1e1e" : "#fff",
        },
    });

    return (
        <main className="px-4">
            <h1 className="font-semibold text-2xl my-5">
                {t("search_items.title")} {params.get("search")}
            </h1>

            <ThemeProvider
                theme={createTheme({
                    palette: {
                        mode: theme.theme === "dark" ? "dark" : "light",
                    },
                })}
            >
                <MaterialReactTable table={table} />
            </ThemeProvider>
        </main>
    );
}
