import { Option, Select } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import reloadPage from "@/utils/reloadPage";
import { useTranslation } from "react-i18next";

export default function SelectLanguage() {
    const [activeLang, setActiveLang] = useState<string>("");
    const { t } = useTranslation();

    useEffect(() => {
        setActiveLang(localStorage.getItem("i18nextLng")!);
    });

    return (
        <Select
            label={t("layout.lang_placeholder")}
            value={activeLang}
            animate={{
                mount: { y: -10 },
                unmount: { y: 45 },
            }}
            className="dark:text-white"
            labelProps={{
                className: "dark:text-white",
            }}
            onChange={(value) => {
                localStorage.setItem("i18nextLng", value!);
                reloadPage();
            }}
        >
            <Option value="en">English</Option>
            <Option value="ru">Русский</Option>
        </Select>
    );
}
