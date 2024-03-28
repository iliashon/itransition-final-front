import { FormEvent, useState } from "react";
import TUserData from "@/types/user/TUserData";
import TCommentList from "@/types/comment/TCommentList";
import CommentService from "@/services/comment.service";
import Avatar from "@/components/view/Avatar";
import { useTranslation } from "react-i18next";

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
    const { t } = useTranslation();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const newComment = await CommentService.create({
            text,
            item_id,
        }).then((res) => res.data);
        handleCreate(newComment);
        setText("");
    };

    return (
        <form className="flex mt-5 gap-3 w-full" onSubmit={handleSubmit}>
            <Avatar
                image_url={userData.image_url}
                fullName={{
                    firstName: userData.first_name,
                    lastName: userData.last_name,
                }}
            />
            <div className="flex flex-col gap-3 w-full relative pb-14 rounded-lg">
                <textarea
                    value={text}
                    placeholder={t("comment.create_comment_placeholder")}
                    onChange={(event) => setText(event.target.value)}
                    className="h-[100px] rounded-lg p-3 resize-none bg-transparent focus:outline-none"
                />
                <hr />
                <button
                    type="submit"
                    className="bg-black text-white dark:bg-white dark:text-black py-2 px-5 rounded-lg absolute right-2 bottom-2 font-semibold text-sm"
                >
                    {t("button_send")}
                </button>
            </div>
        </form>
    );
}
