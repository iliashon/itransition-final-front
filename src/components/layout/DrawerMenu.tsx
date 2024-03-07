"use client";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Button, Drawer } from "@material-tailwind/react";
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import Logo from "@/components/layout/Logo";
import SwitchColorMode from "@/components/switch/SwitchColorMode";
import LangMenu from "@/components/layout/LangMenu";

export default function DrawerMenu() {
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
                <div></div>
                <div className="flex flex-col gap-5 p-4 items-start">
                    <LangMenu />
                    <SwitchColorMode />
                </div>
            </Drawer>
        </>
    );
}
