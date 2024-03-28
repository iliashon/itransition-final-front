"use client";

import {
    Avatar,
    Button,
    Menu,
    MenuHandler,
    MenuItem,
    MenuList,
} from "@material-tailwind/react";
import TUserData from "@/types/user/TUserData";
import { HiLogout } from "react-icons/hi";
import { MdDashboard } from "react-icons/md";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { RiAdminFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

export default function UserMenu({ userData }: { userData: TUserData }) {
    const { logout } = useAuth();
    const { t } = useTranslation();

    return (
        <Menu placement="bottom-end">
            <MenuHandler>
                {userData.image_url ? (
                    <Avatar
                        variant="circular"
                        className="cursor-pointer"
                        size="sm"
                        src={userData.image_url}
                        alt={userData.first_name}
                    />
                ) : (
                    <Button className="rounded-full border dark:border-white/30 border-black/30 dark:text-white text-black bg-transparent p-0 h-10 w-10 text-sm flex items-center justify-center">
                        {`${userData.first_name.slice(0, 1)}${userData.last_name.slice(0, 1)}`}
                    </Button>
                )}
            </MenuHandler>
            <MenuList>
                <div className="px-3 flex flex-col">
                    <span className="text-black">
                        {`${userData.first_name} ${userData.last_name}`}
                    </span>
                    <span className="text-[11px]">{userData.email}</span>
                    {userData?.is_admin && (
                        <span className="text-[12px] text-white bg-green-500 rounded-lg flex gap-1 items-center justify-center">
                            {t("layout.admin_badge")}
                            <RiAdminFill />
                        </span>
                    )}
                </div>
                <hr className="my-2" />
                <MenuItem className="flex gap-3 items-center">
                    <MdDashboard className="h-5 w-5" />
                    <Link href="/dashboard">{t("layout.dashboard_link")}</Link>
                </MenuItem>
                <hr className="my-2" />
                <MenuItem
                    className="flex gap-3 items-center"
                    onClick={() => logout()}
                >
                    <HiLogout className="h-5 w-5" />
                    {t("layout.logout_link")}
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
