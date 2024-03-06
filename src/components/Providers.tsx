"use client";

import { ReactNode } from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as MaterialTailwindProvider } from "@material-tailwind/react";
import { ReactNodeLike } from "prop-types";

export default function Providers({ children }: { children: ReactNode }) {
    return (
        <MaterialTailwindProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                {children}
            </NextThemesProvider>
        </MaterialTailwindProvider>
    );
}
