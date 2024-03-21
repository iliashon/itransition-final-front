"use client";

import {
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import TUserData from "@/types/auth/TUserData";
import { HiLogout } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { RiAdminLine } from "react-icons/ri";
import Avatar from "@/components/view/Avatar";

export default function UserMenu({ userData }: { userData: TUserData }) {
    const { logout } = useAuth();

    return (
        <Menu placement="bottom-end">
            <MenuHandler>
                <Avatar
                    image_url={userData.image_url}
                    fullName={{
                        firstName: userData.first_name,
                        lastName: userData.last_name,
                    }}
                />
            </MenuHandler>
            <MenuList>
                <div className="px-3 flex flex-col">
                    <span className="text-black">
                        {`${userData.first_name} ${userData.last_name}`}
                    </span>
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
