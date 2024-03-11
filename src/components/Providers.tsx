"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as MaterialTailwindProvider } from "@material-tailwind/react";
import AuthProvider from "@/components/AuthProvider";

export default function Providers({ children }: { children: any }) {
    return (
        <AuthProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <MaterialTailwindProvider>{children}</MaterialTailwindProvider>
            </NextThemesProvider>
        </AuthProvider>
    );
}
