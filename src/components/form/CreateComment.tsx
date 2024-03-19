"use client";

import { FormEvent, useState } from "react";
import { Avatar } from "@material-tailwind/react";
import TUserData from "@/types/auth/TUserData";
import TCommentList from "@/types/comment/TCommentList";
import CommentService from "@/services/comment.service";
import { ClipLoader } from "react-spinners";

export default function CreateComment({
    userData,
    handleCreate,
    item_id,
}: {
    userData: TUserData;
    handleCreate: (comment: TCommentList) => void;
    item_id: number;
}) {
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);
        const newComment = await CommentService.create({
            text,
            item_id,
        }).then((res) => res.data);
        handleCreate(newComment);
        setText("");
        setLoading(false);
    };

    return (
        <section className="flex mt-5 gap-3 w-full">
            {userData.image_url ? (
                <Avatar src={userData.image_url} variant="rounded" />
            ) : (
                <span className="rounded-lg border dark:border-white/30 border-black/30 h-10 px-3 text-sm flex items-center justify-center">
                    {`${userData.first_name.slice(0, 1)}${userData.last_name.slice(0, 1)}`}
                </span>
            )}

            <form
                className="flex w-full flex-col gap-3 relative border pb-14 rounded-lg"
                onSubmit={handleSubmit}
            >
                <textarea
                    value={text}
                    onChange={(event) => setText(event.target.value)}
                    className=" h-[150px] rounded-lg p-3 resize-none bg-transparent"
                />
                <button
                    type="submit"
                    className="bg-black text-white py-2 px-5 rounded-lg absolute right-2 bottom-2 font-semibold text-sm"
                >
                    Send
                </button>
                {loading && (
                    <div className="absolute left-0 top-0 w-full h-full bg-black/30 rounded-lg flex justify-center items-center">
                        <ClipLoader />
                    </div>
                )}
            </form>
        </section>
    );
}
