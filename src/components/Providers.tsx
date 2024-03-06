"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as MaterialTailwindProvider } from "@material-tailwind/react";

export default function Providers({ children }: { children: any }) {
    return (
        <NextThemesProvider attribute="class" defaultTheme="dark">
            <MaterialTailwindProvider>{children}</MaterialTailwindProvider>
        </NextThemesProvider>
    );
}
