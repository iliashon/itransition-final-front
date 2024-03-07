import { Option, Select } from "@material-tailwind/react";
import { useState } from "react";

export default function LangMenu() {
    const [activeLang, setActiveLang] = useState<string>("");

    return (
        <Select
            label="Language"
            value={activeLang}
            animate={{
                mount: { y: -10 },
                unmount: { y: 45 },
            }}
            className="dark:text-white"
            labelProps={{
                className: "dark:text-white",
            }}
        >
            <Option value="en">English</Option>
            <Option value="ru">Russian</Option>
        </Select>
    );
}
