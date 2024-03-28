import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import TSignInForm from "@/types/auth/TSignInForm";
import TLogInForm from "@/types/auth/TLogInForm";
import { Alert } from "@material-tailwind/react";
import { PiWarningCircle } from "react-icons/pi";
import useAuth from "@/hooks/useAuth";
import { ClipLoader } from "react-spinners";
import { useTranslation } from "react-i18next";

const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const style = {
    input: "h-12 px-4 rounded-lg text-lg bg-transparent border border-black focus:outline-none w-full",
};

export default function SignUpForm() {
    const [isHiddenPass, setIsHiddenPass] = useState(true);
    const [error, setError] = useState<string>();
    const { register: registration, loading } = useAuth();
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInForm>();

    const onSubmitForm: SubmitHandler<TSignInForm> = async (data) => {
        await registration(data).then((res) => {
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
            className="flex flex-col gap-5 relative"
            onSubmit={handleSubmit(onSubmitForm)}
        >
            {error && (
                <Alert color="red" className="py-3">
                    {error}
                </Alert>
            )}
            <input
                type="text"
                placeholder={t("layout.auth_modal.first_name_placeholder")}
                {...register("first_name", {
                    required: t("layout.auth_modal.error.require"),
                })}
                className={`${style.input} ${errors.first_name ? "border-red-500" : ""}`}
            />
            {errors.first_name ? (
                <Alert
                    variant="ghost"
                    color="red"
                    icon={<PiWarningCircle className="h-6 w-6" />}
                    className="-mt-3 py-2"
                >
                    {errors.first_name.message}
                </Alert>
            ) : (
                ""
            )}
            <input
                type="text"
                placeholder={t("layout.auth_modal.last_name_placeholder")}
                {...register("last_name", {
                    required: t("layout.auth_modal.error.require"),
                })}
                className={`${style.input} ${errors.last_name ? "border-red-500" : ""}`}
            />
            {errors.last_name ? (
                <Alert
                    variant="ghost"
                    color="red"
                    icon={<PiWarningCircle className="h-6 w-6" />}
                    className="-mt-3 py-2"
                >
                    {errors.last_name.message}
                </Alert>
            ) : (
                ""
            )}
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
                className={`${style.input} ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email ? (
                <Alert
                    variant="ghost"
                    color="red"
                    icon={<PiWarningCircle className="h-6 w-6" />}
                    className="-mt-3 py-2"
                >
                    {errors.email.message}
                </Alert>
            ) : (
                ""
            )}
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
                    className={`${style.input} pr-10 ${errors.password ? "border-red-500" : ""}`}
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
                        className="mt-2 py-2"
                    >
                        {errors.password.message}
                    </Alert>
                ) : (
                    ""
                )}
            </div>
            <button className="bg-black text-white h-12 rounded-lg font-medium text-lg hover:opacity-70 duration-300">
                {t("layout.auth_modal.signin_title")}
            </button>
            {loading && (
                <div className="absolute -top-5 -bottom-4 -left-4 -right-4 rounded-xl backdrop-blur-sm flex justify-center items-center">
                    <ClipLoader />
                </div>
            )}
        </form>
    );
}
