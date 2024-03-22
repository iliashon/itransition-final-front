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
import { ActionUserTable } from "@/types/user/TActions";

export default function UsersTable() {
    const [users, setUsers] = useState<TUserData[]>();
    const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({});
    const [loading, setLoading] = useState(true);

    const getUsers = () => {
        setLoading(true);
        UserService.getAll().then((res) => {
            setUsers(res.data);
            setLoading(false);
        });
    };

    const handleAction = async (action: ActionUserTable) => {
        setLoading(true);
        const usersIds = Object.keys(rowSelection).map((id) => Number(id));
        switch (action) {
            case ActionUserTable.ADMIN:
                await UserService.update(usersIds, "admin", true).then(() => {
                    getUsers();
                });
                break;
            case ActionUserTable.UNADMIN:
                await UserService.update(usersIds, "admin", false).then(() => {
                    getUsers();
                });
                break;
            case ActionUserTable.BLOCK:
                await UserService.update(usersIds, "block", true).then(() => {
                    getUsers();
                });
                break;
            case ActionUserTable.UNBLOCK:
                await UserService.update(usersIds, "block", false).then(() => {
                    getUsers();
                });
                break;
            case ActionUserTable.DELETE:
                await UserService.delete(usersIds).then(() => {
                    getUsers();
                });
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
        renderTopToolbarCustomActions: ({ table }) => {
            return (
                <div className="flex gap-3 flex-wrap mb-3 items-center">
                    <Button
                        onClick={() => handleAction(ActionUserTable.DELETE)}
                        color="red"
                        size="sm"
                    >
                        Delete
                    </Button>
                    <Button
                        onClick={() => handleAction(ActionUserTable.BLOCK)}
                        color="red"
                        size="sm"
                    >
                        Block
                    </Button>
                    <Button
                        onClick={() => handleAction(ActionUserTable.UNADMIN)}
                        color="red"
                        size="sm"
                    >
                        Unassign Admin
                    </Button>
                    <Button
                        onClick={() => handleAction(ActionUserTable.UNBLOCK)}
                        color="green"
                        size="sm"
                    >
                        Unblock
                    </Button>
                    <Button
                        onClick={() => handleAction(ActionUserTable.ADMIN)}
                        color="green"
                        size="sm"
                    >
                        Assign Admin
                    </Button>
                </div>
            );
        },
    });

    return <MaterialReactTable table={table} />;
}
