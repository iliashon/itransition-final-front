import { Switch } from "@material-tailwind/react";
import { useTheme } from "next-themes";

const DARK_MODE = "dark",
    LIGHT_MODE = "light";

export default function SwitchColorMode() {
    const { theme, setTheme } = useTheme();

    const handleChangeColorMode = () => {
        setTheme(theme === DARK_MODE ? LIGHT_MODE : DARK_MODE);
    };

    return <Switch crossOrigin onChange={handleChangeColorMode} />;
}
