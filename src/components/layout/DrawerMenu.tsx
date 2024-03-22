"use client";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Button, Drawer } from "@material-tailwind/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Logo from "@/components/layout/Logo";
import SwitchColorMode from "@/components/layout/SwitchColorMode";
import SelectLanguage from "@/components/layout/SelectLanguage";
import TUserData from "@/types/user/TUserData";
import Link from "next/link";
import SearchByItems from "@/components/layout/SearchByItems";

export default function DrawerMenu({ userData }: { userData?: TUserData }) {
    const [isOpenDrawer, setIsOpenDrawer] = useState(false);

    const handleOpenDrawer = () => {
        setIsOpenDrawer(true);
    };

    const handleCloseDrawer = () => {
        setIsOpenDrawer(false);
    };

    return (
        <>
            <Button
                className="bg-transparent p-0 shadow-none hover:shadow-none hover:scale-110 "
                onClick={handleOpenDrawer}
            >
                <HiOutlineMenuAlt3 className="h-6 w-6 dark:text-white text-black" />
            </Button>
            <Drawer
                placement="right"
                open={isOpenDrawer}
                onClose={handleCloseDrawer}
                className="p-4 flex flex-col justify-between dark:bg-black border-l border-l-white/30"
            >
                <div className="flex justify-between items-center">
                    <Logo />
                    <IoClose
                        className="h-7 w-7 opacity-50 hover:opacity-100 duration-300 cursor-pointer"
                        onClick={handleCloseDrawer}
                    />
                </div>
                <div className="h-full py-10 flex flex-col gap-4 text-xl">
                    <SearchByItems className="w-full h-[36px] relative block lg:hidden" />
                    <Link
                        href="/collection"
                        className="opacity-50 hover:opacity-100 duration-300"
                        onClick={handleCloseDrawer}
                    >
                        Collections
                    </Link>
                    {userData?.is_admin && (
                        <Link
                            href="/users"
                            className="opacity-50 hover:opacity-100 duration-300"
                            onClick={handleCloseDrawer}
                        >
                            Users
                        </Link>
                    )}
                </div>
                <div className="flex flex-col gap-5 p-4 items-start">
                    <SelectLanguage />
                    <SwitchColorMode />
                </div>
            </Drawer>
        </>
    );
}
