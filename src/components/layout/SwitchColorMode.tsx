"use client";

import { Switch } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const DARK_MODE = "dark",
    LIGHT_MODE = "light";

export default function SwitchColorMode() {
    const { theme, setTheme } = useTheme();
    const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
    const { t } = useTranslation();

    const handleChangeColorMode = (event: ChangeEvent<HTMLInputElement>) => {
        const isDark = event.target.checked;
        setIsDarkMode(isDark);
        setTheme(isDark ? DARK_MODE : LIGHT_MODE);
        document.documentElement.setAttribute(
            "data-color-mode",
            isDark ? DARK_MODE : LIGHT_MODE,
        );
    };

    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", DARK_MODE);
        }
        const mode = localStorage.getItem("theme");
        setIsDarkMode(mode === DARK_MODE);
        document.documentElement.setAttribute(
            "data-color-mode",
            mode === DARK_MODE ? DARK_MODE : LIGHT_MODE,
        );
    }, []);

    return (
        <Switch
            checked={isDarkMode}
            onChange={handleChangeColorMode}
            labelProps={{
                className: `${theme === "dark" ? "text-white" : "text-black"} text-sm`,
            }}
            label={t("layout.dark_mode_label")}
        />
    );
}
