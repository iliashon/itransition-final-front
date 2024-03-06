"use client";

import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Button, Drawer } from "@material-tailwind/react";
import { useState } from "react";

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
                className="bg-transparent p-0 shadow-none hover:shadow-none hover:scale-110 lg:hidden"
                onClick={handleOpenDrawer}
            >
                <HiOutlineMenuAlt3 className="h-6 w-6 dark:text-white text-black" />
            </Button>
            <Drawer
                placement="right"
                open={isOpenDrawer}
                onClose={handleCloseDrawer}
                className="p-4"
            >
                <div></div>
                <div></div>
            </Drawer>
        </>
    );
}
