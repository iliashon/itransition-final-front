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

export default function AuthModal() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const urlSearchParams = useSearchParams();

    const handleOpenModal = () => {
        setIsOpenModal(!isOpenModal);
    };

    useEffect(() => {
        setIsOpenModal(urlSearchParams.has("login"));
    }, []);

    return (
        <>
            <Button
                onClick={handleOpenModal}
                className="normal-case hidden shadow-none hover:shadow-none bg-transparent lg:flex font-medium dark:text-white text-black border dark:border-white/30 border-black/30 hover:opacity-70 duration-300 px-3 py-2 rounded-lg items-center gap-2"
            >
                Log In
                <MdOutlineLogin className="h-4 w-4" />
            </Button>
            <Dialog
                open={isOpenModal}
                handler={handleOpenModal}
                className="focus:outline-none"
            >
                <Tabs value="login">
                    <TabsHeader>
                        <Tab value="login" className="text-lg font-bold">
                            Log In
                        </Tab>
                        <Tab value="signup" className="text-lg font-bold">
                            Sign Up
                        </Tab>
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: { y: 0 },
                            unmount: { y: 0, x: 300 },
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
