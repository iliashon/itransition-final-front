import {
    MaterialReactTable,
    MRT_ColumnDef,
    MRT_RowSelectionState,
    useMaterialReactTable,
} from "material-react-table";
import { useEffect, useMemo, useState } from "react";
import TUserData from "@/types/user/TUserData";
import UserService from "@/services/user.service";
import { AiFillCheckCircle, AiFillCloseCircle } from "react-icons/ai";
import { Button } from "@material-tailwind/react";
import TActions, { ActionUserTable } from "@/types/user/TActions";
import { MdDelete } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { TbLock } from "react-icons/tb";
import useAuth from "@/hooks/useAuth";
import reloadPage from "@/utils/reloadPage";
import { createTheme, ThemeProvider } from "@mui/material";
import { useTheme } from "next-themes";

export default function UsersTable({ userData }: { userData: TUserData }) {
    const [users, setUsers] = useState<TUserData[]>();
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [loading, setLoading] = useState(true);
    const { refresh } = useAuth();
    const theme = useTheme();

    const getUsers = () => {
        setLoading(true);
        UserService.getAll().then((res) => {
            setUsers(res.data);
            setLoading(false);
        });
    };

    const handleUpdate = async (
        userIds: number[],
        action: TActions,
        value: boolean,
    ) => {
        await UserService.update(userIds, action, value).then(() => {
            getUsers();
            if (userIds.includes(userData.id) && action === "admin" && !value) {
                reloadPage();
            }
        });
    };

    const handleDelete = async (userIds: number[]) => {
        await UserService.delete(userIds).then(() => {
            getUsers();
        });
        await refresh();
    };

    const handleAction = async (action: ActionUserTable) => {
        setLoading(true);
        const usersIds = Object.keys(rowSelection).map((id) => Number(id));
        switch (action) {
            case ActionUserTable.ADMIN:
                await handleUpdate(usersIds, "admin", true);
                break;
            case ActionUserTable.UNADMIN:
                await handleUpdate(usersIds, "admin", false);
                break;
            case ActionUserTable.BLOCK:
                await handleUpdate(usersIds, "block", true);
                break;
            case ActionUserTable.UNBLOCK:
                await handleUpdate(usersIds, "block", false);
                break;
            case ActionUserTable.DELETE:
                await handleDelete(usersIds);
                break;
        }
        setRowSelection({});
    };

    const columns = useMemo<MRT_ColumnDef<TUserData>[]>(
        () => [
            {
                accessorKey: "id",
                header: "ID",
                size: 70,
            },
            {
                accessorKey: "first_name",
                header: "Full name",
                Cell: (props) => {
                    return `${props.row.original.first_name} ${props.row.original.last_name}`;
                },
            },
            {
                accessorKey: "email",
                header: "Email",
            },
            {
                accessorKey: "blocked",
                header: "Blocked",
                Cell: (props) => {
                    return !props.row.original.blocked ? (
                        <AiFillCloseCircle className="h-7 w-7 text-red-500" />
                    ) : (
                        <AiFillCheckCircle className="h-7 w-7 text-green-500" />
                    );
                },
            },
            {
                accessorKey: "is_admin",
                header: "Admin",
                Cell: (props) => {
                    return !props.row.original.is_admin ? (
                        <AiFillCloseCircle className="h-7 w-7 text-red-500" />
                    ) : (
                        <AiFillCheckCircle className="h-7 w-7 text-green-500" />
                    );
                },
            },
            {
                accessorKey: "created_at",
                header: "Create time",
                Cell: (props) => {
                    return (
                        <span>
                            {new Date(
                                props.row.original.created_at,
                            ).toLocaleString()}
                        </span>
                    );
                },
            },
        ],
        [],
    );

    useEffect(() => {
        getUsers();
    }, []);

    const table = useMaterialReactTable({
        columns,
        data: users || [],
        enableRowSelection: true,
        getRowId: (row) => row.id?.toString(),
        onRowSelectionChange: setRowSelection,
        positionToolbarAlertBanner: "none",
        state: { rowSelection, isLoading: loading, density: "compact" },
        muiTableContainerProps: {
            sx: { height: "calc(100vh - 290px)" },
        },
        enableDensityToggle: false,
        enableColumnFilters: false,
        enableFilters: false,
        enableColumnActions: false,
        enableHiding: false,
        enableRowActions: true,
        mrtTheme: {
            baseBackgroundColor: theme.theme === "dark" ? "#1e1e1e" : "#fff",
        },
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <div className="flex gap-3 flex-wrap mb-3 items-center">
                    {Object.keys(rowSelection).length > 0 && (
                        <>
                            <Button
                                onClick={() =>
                                    handleAction(ActionUserTable.DELETE)
                                }
                                color="red"
                                size="sm"
                            >
                                Delete
                            </Button>
                            <Button
                                onClick={() =>
                                    handleAction(ActionUserTable.BLOCK)
                                }
                                color="red"
                                size="sm"
                            >
                                Block
                            </Button>
                            <Button
                                onClick={() =>
                                    handleAction(ActionUserTable.UNADMIN)
                                }
                                color="red"
                                size="sm"
                            >
                                Unassign Admin
                            </Button>
                            <Button
                                onClick={() =>
                                    handleAction(ActionUserTable.UNBLOCK)
                                }
                                color="green"
                                size="sm"
                            >
                                Unblock
                            </Button>
                            <Button
                                onClick={() =>
                                    handleAction(ActionUserTable.ADMIN)
                                }
                                color="green"
                                size="sm"
                            >
                                Assign Admin
                            </Button>
                        </>
                    )}
                </div>
            );
        },
        renderRowActions: ({ row, table }) => {
            return (
                <div className="flex gap-3">
                    <MdDelete
                        className={`h-5 w-5 cursor-pointer text-red-500 opacity-50 hover:opacity-100`}
                        onClick={() => handleDelete([row.original.id])}
                    />
                    <RiAdminFill
                        className={`h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 ${row.original.is_admin ? "text-red-500" : "text-green-500"}`}
                        onClick={() =>
                            handleUpdate(
                                [row.original.id],
                                "admin",
                                !row.original.is_admin,
                            )
                        }
                    />
                    <TbLock
                        className={`h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 ${row.original.blocked ? "text-red-500" : "text-green-500"}`}
                        onClick={() =>
                            handleUpdate(
                                [row.original.id],
                                "block",
                                !row.original.blocked,
                            )
                        }
                    />
                </div>
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
