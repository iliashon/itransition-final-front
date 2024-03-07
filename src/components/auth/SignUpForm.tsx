import { useState } from "react";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useForm } from "react-hook-form";
import TSignInForm from "@/types/auth/TSignInForm";

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

    const handleShowPass = () => {
        setIsHiddenPass(!isHiddenPass);
    };

    return (
        <form className="flex flex-col gap-5">
            <input
                type="text"
                placeholder="First name"
                {...register("first_name")}
                className={`${style.input}`}
            />
            <input
                type="text"
                placeholder="Last name"
                {...register("last_name")}
                className={`${style.input}`}
            />
            <input
                type="text"
                placeholder="Email"
                {...register("email")}
                className={`${style.input}`}
            />
            <div className="relative">
                <input
                    type={isHiddenPass ? "password" : "text"}
                    placeholder="Password"
                    {...register("password")}
                    className={`${style.input} pr-10`}
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
            </div>
            <button className="bg-black text-white h-12 rounded-lg font-medium text-lg hover:opacity-70 duration-300">
                Sign Up
            </button>
        </form>
    );
}
