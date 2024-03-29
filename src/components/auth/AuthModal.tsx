"use client";

import {
    Button,
    Dialog,
    Tab,
    TabPanel,
    Tabs,
    TabsBody,
    TabsHeader,
} from "@material-tailwind/react";
import { MdOutlineLogin } from "react-icons/md";
import { useEffect, useState } from "react";
import LogInForm from "@/components/auth/LogInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";

export default function AuthModal() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [openTab, setOpenTab] = useState<"login" | "signup">("login");
    const params = useSearchParams();
    const { t } = useTranslation();

    const handleOpenModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    useEffect(() => {
        setIsOpenModal(params.has("login"));
    }, [params]);

    return (
        <>
            <Button
                onClick={handleOpenModal}
                className="normal-case hidden shadow-none hover:shadow-none bg-transparent lg:flex font-medium dark:text-white text-black border dark:border-white/30 border-black/30 hover:opacity-70 duration-300 px-3 py-2 rounded-lg items-center gap-2"
            >
                {t("layout.login_link")}
                <MdOutlineLogin className="h-4 w-4" />
            </Button>
            <Dialog
                open={isOpenModal}
                handler={handleOpenModal}
                className="focus:outline-none"
            >
                <Tabs value={openTab}>
                    <TabsHeader>
                        <Tab
                            value="login"
                            className="text-lg font-bold"
                            onClick={() => setOpenTab("login")}
                        >
                            {t("layout.auth_modal.login_title")}
                        </Tab>
                        <Tab
                            value="signup"
                            className="text-lg font-bold"
                            onClick={() => setOpenTab("signup")}
                        >
                            {t("layout.auth_modal.signin_title")}
                        </Tab>
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: {
                                x: openTab === "login" ? 400 : -400,
                            },
                            mount: {
                                x: 0,
                            },
                            unmount: {
                                x: openTab === "login" ? 400 : -400,
                            },
                        }}
                    >
                        <TabPanel value="login">
                            <LogInForm />
                        </TabPanel>
                        <TabPanel value="signup">
                            <SignUpForm />
                        </TabPanel>
                    </TabsBody>
                </Tabs>
            </Dialog>
        </>
    );
}
