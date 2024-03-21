"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ThemeProvider as MaterialTailwindProvider } from "@material-tailwind/react";
import AuthProvider from "@/components/providers/AuthProvider";
import "@/configs/i18n.config";

export default function Providers({ children }: { children: any }) {
    return (
        <AuthProvider>
            <NextThemesProvider attribute="class" defaultTheme="dark">
                <MaterialTailwindProvider>{children}</MaterialTailwindProvider>
            </NextThemesProvider>
        </AuthProvider>
    );
}
