"use client";

import { Switch } from "@material-tailwind/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const DARK_MODE = "dark",
    LIGHT_MODE = "light";

export default function SwitchColorMode() {
    const { theme, setTheme } = useTheme();
    const [switchState, setSwitchState] = useState(true);

    const handleChangeColorMode = () => {
        setSwitchState(!switchState);
        setTheme(theme === DARK_MODE ? LIGHT_MODE : DARK_MODE);
    };

    useEffect(() => {
        setSwitchState(localStorage.getItem("theme") === "dark");
    }, []);

    return (
        <Switch
            checked={switchState}
            onChange={handleChangeColorMode}
            labelProps={{
                className: `${theme === "dark" ? "text-white" : "text-black"} text-sm`,
            }}
            label="Dark mode"
        />
    );
}
