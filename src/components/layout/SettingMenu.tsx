"use client";

import {
    Menu,
    MenuHandler,
    MenuList,
    MenuItem,
    Button,
} from "@material-tailwind/react";
import { CiSettings } from "react-icons/ci";
import SwitchColorMode from "@/components/switch/SwitchColorMode";
import { useState } from "react";
import { useTheme } from "next-themes";

export default function SettingMenu() {
    const { theme } = useTheme();

    return (
        <div className="hidden lg:block">
            <Menu
                dismiss={{ enabled: true, escapeKey: true, itemPress: false }}
            >
                <MenuHandler>
                    <Button className="bg-transparent p-0 shadow-none hover:shadow-none hover:scale-110">
                        <CiSettings className="h-7 w-7 cursor-pointer text-black dark:text-white" />
                    </Button>
                </MenuHandler>
                <MenuList
                    className={`${theme === "dark" ? "bg-white" : "bg-black"}`}
                >
                    <MenuItem className="focus:bg-transparent active:bg-transparent">
                        <SwitchColorMode />
                    </MenuItem>
                </MenuList>
            </Menu>
        </div>
    );
}
