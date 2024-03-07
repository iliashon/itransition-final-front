import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { SubmitHandler, useForm } from "react-hook-form";
import TSignInForm from "@/types/auth/TSignInForm";
import TLogInForm from "@/types/auth/TLogInForm";
import { Alert } from "@material-tailwind/react";
import { PiWarningCircle } from "react-icons/pi";

const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const style = {
    input: "h-12 px-4 rounded-lg text-lg bg-transparent border border-black focus:outline-none w-full",
};

export default function SignUpForm() {
    const [isHiddenPass, setIsHiddenPass] = useState(true);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TSignInForm>();

    const onSubmitForm: SubmitHandler<TLogInForm> = (data) => {
        console.log(data);
    };

    const handleShowPass = () => {
        setIsHiddenPass(!isHiddenPass);
    };

    return (
        <form
            className="flex flex-col gap-5"
            onSubmit={handleSubmit(onSubmitForm)}
        >
            <input
                type="text"
                placeholder="First name"
                {...register("first_name", {
                    required: "This field is required",
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
                placeholder="Last name"
                {...register("last_name", {
                    required: "This field is required",
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
                placeholder="Email"
                {...register("email", {
                    required: "This field is required",
                    pattern: {
                        value: REGEX_EMAIL,
                        message: "Check mail format example@gmail.com",
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
                    placeholder="Password"
                    {...register("password", {
                        required: "This field is required",
                        minLength: {
                            value: 8,
                            message: "Minimum 8 characters",
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
                Sign Up
            </button>
        </form>
    );
}
