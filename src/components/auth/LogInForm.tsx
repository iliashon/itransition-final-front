"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import TLogInForm from "@/types/auth/TLogInForm";
import { Alert } from "@material-tailwind/react";
import { PiWarningCircle } from "react-icons/pi";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import useAuth from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const style = {
    input: "h-12 px-4 rounded-lg text-lg bg-transparent border border-black focus:outline-none w-full",
};

export default function LogInForm() {
    const [isHiddenPass, setIsHiddenPass] = useState(true);
    const [error, setError] = useState<string>();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLogInForm>();
    const { login, loading } = useAuth();
    const { t } = useTranslation();

    const onSubmitForm: SubmitHandler<TLogInForm> = async (data) => {
        await login(data).then((res) => {
            if (typeof res === "string") {
                setError(res);
            }
        });
    };

    const handleShowPass = () => {
        setIsHiddenPass(!isHiddenPass);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col justify-between h-full relative"
        >
            <div className="flex flex-col gap-7">
                {error && (
                    <Alert color="red" className="py-3">
                        {error}
                    </Alert>
                )}
                <div>
                    <input
                        type="text"
                        placeholder={t("layout.auth_modal.email_placeholder")}
                        {...register("email", {
                            required: t("layout.auth_modal.error.require"),
                            pattern: {
                                value: REGEX_EMAIL,
                                message: t("layout.auth_modal.error.email"),
                            },
                        })}
                        className={`${style.input} ${errors.email ? "border-red-500 text-red-500" : ""}`}
                    />
                    {errors.email ? (
                        <Alert
                            variant="ghost"
                            color="red"
                            icon={<PiWarningCircle className="h-6 w-6" />}
                            className="mt-3 py-3"
                        >
                            {errors.email.message}
                        </Alert>
                    ) : (
                        ""
                    )}
                </div>
                <div className="relative">
                    <input
                        type={isHiddenPass ? "password" : "text"}
                        placeholder={t("layout.auth_modal.pass_placeholder")}
                        {...register("password", {
                            required: t("layout.auth_modal.error.require"),
                            minLength: {
                                value: 8,
                                message: t("layout.auth_modal.error.password"),
                            },
                        })}
                        className={`${style.input} pr-10 ${errors.password ? "border-red-500 text-red-500" : ""}`}
                    />
                    {isHiddenPass ? (
                        <IoEyeOffOutline
                            className="h-6 w-6 absolute right-3 top-3 cursor-pointer"
                            onClick={handleShowPass}
                        />
                    ) : (
                        <IoEyeOutline
                            className="h-6 w-6 absolute right-3 top-3 cursor-pointer"
                            onClick={handleShowPass}
                        />
                    )}
                    {errors.password ? (
                        <Alert
                            variant="ghost"
                            color="red"
                            icon={<PiWarningCircle className="h-6 w-6" />}
                            className="mt-3 py-3"
                        >
                            {errors.password.message}
                        </Alert>
                    ) : (
                        ""
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="bg-black mt-7 text-white h-12 rounded-lg font-medium text-lg hover:opacity-70 duration-300"
            >
                {t("layout.auth_modal.login_title")}
            </button>
            {loading && (
                <div className="absolute -top-5 -bottom-4 -left-4 -right-4 rounded-xl backdrop-blur-sm flex justify-center items-center">
                    <ClipLoader />
                </div>
            )}
        </form>
    );
}
