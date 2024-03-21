import { FormEvent, useState } from "react";
import TUserData from "@/types/auth/TUserData";
import TCommentList from "@/types/comment/TCommentList";
import CommentService from "@/services/comment.service";
import { ClipLoader } from "react-spinners";
import Avatar from "@/components/view/Avatar";

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
                    placeholder="Add your comment..."
                    onChange={(event) => setText(event.target.value)}
                    className="h-[100px] rounded-lg p-3 resize-none bg-transparent focus:outline-none"
                />
                <hr />
                <button
                    type="submit"
                    className="bg-black text-white dark:bg-white dark:text-black py-2 px-5 rounded-lg absolute right-2 bottom-2 font-semibold text-sm"
                >
                    Send
                </button>
            </div>
            {loading && (
                <div className="absolute left-0 top-0 w-full h-full bg-black/30 rounded-lg flex justify-center items-center">
                    <ClipLoader />
                </div>
            )}
        </form>
    );
}
