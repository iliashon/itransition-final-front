"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import TLogInForm from "@/types/auth/TLogInForm";
import { Alert } from "@material-tailwind/react";
import { PiWarningCircle } from "react-icons/pi";
import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const REGEX_EMAIL = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

const style = {
    input: "h-12 px-4 rounded-lg text-lg bg-transparent border border-black focus:outline-none w-full",
};

export default function LogInForm() {
    const [isHiddenPass, setIsHiddenPass] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TLogInForm>();

    const onSubmitForm: SubmitHandler<TLogInForm> = (data) => {
        console.log(data);
    };

    const handleShowPass = () => {
        setIsHiddenPass(!isHiddenPass);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmitForm)}
            className="flex flex-col justify-between h-full"
        >
            <div className="flex flex-col gap-7">
                <div>
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
                        placeholder="Password"
                        {...register("password", {
                            required: "This field is required",
                            minLength: {
                                value: 8,
                                message: "Minimum 8 characters",
                            },
                        })}
                        className={`${style.input} ${errors.password ? "border-red-500 text-red-500" : ""}`}
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
                Log In
            </button>
        </form>
    );
}
