"use client";

import { Switch } from "@material-tailwind/react";
import { ChangeEvent } from "react";
import { useTheme } from "next-themes";
import SwitchColorMode from "@/components/switch/SwitchColorMode";

export default function Home() {
    const { setTheme, theme } = useTheme();

    console.log(theme);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Home</h1>
        </main>
    );
}
