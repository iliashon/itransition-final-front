"use client";

import {
    Avatar,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import TUserData from "@/types/auth/TUserData";
import { HiLogout } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function UserMenu({ userData }: { userData: TUserData }) {
    const router = useRouter();
    const { logout } = useAuth();

    return (
        <Menu placement="bottom-end">
            <MenuHandler>
                <Avatar
                    variant="circular"
                    className="cursor-pointer"
                    size="sm"
                    src="https://wac-cdn.atlassian.com/dam/jcr:ba03a215-2f45-40f5-8540-b2015223c918/Max-R_Headshot%20(1).jpg?cdnVersion=1483"
                    alt={userData.first_name}
                />
            </MenuHandler>
            <MenuList>
                <div className="px-3 flex flex-col">
                    <span className="text-black">{`${userData.first_name} ${userData.last_name}`}</span>
                    <span className="text-[11px]">{userData.email}</span>
                </div>
                <hr className="my-2" />
                <MenuItem className="flex gap-3 items-center">
                    <MdDashboard className="h-5 w-5" />
                    <Link href="/dashboard">Dashboard</Link>
                </MenuItem>
                <hr className="my-2" />
                <MenuItem
                    className="flex gap-3 items-center"
                    onClick={() => logout()}
                >
                    <HiLogout className="h-5 w-5" />
                    Logout
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
