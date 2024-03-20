"use client";

import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import LikeService from "@/services/like.service";
import TLikeData from "@/types/like/TLikeData";

export default function Like({
    item_id,
    user_id,
}: {
    item_id: number;
    user_id?: number | undefined;
}) {
    const [likes, setLikes] = useState<TLikeData[]>();
    const [activeLikeId, setActiveLikeId] = useState<number | undefined>();

    const searchLike = () => {
        const searchLike = likes?.find((like) => like.user_id === user_id);
        !!searchLike
            ? setActiveLikeId(searchLike.id)
            : setActiveLikeId(undefined);
    };

    const handleDeleteLike = async () => {
        await LikeService.delete(activeLikeId!);
        setLikes(likes?.filter((like) => like.id !== activeLikeId));
    };

    const handleCreateLike = async () => {
        const like = await LikeService.create(item_id).then((res) => res.data);
        setLikes(likes?.concat([like]));
    };

    useEffect(() => {
        LikeService.getByItemId(item_id).then((res) => {
            setLikes(res.data);
        });
    }, []);

    useEffect(() => {
        searchLike();
    }, [likes]);

    return (
        <div className="flex gap-2">
            <FaHeart
                onClick={
                    user_id
                        ? activeLikeId
                            ? handleDeleteLike
                            : handleCreateLike
                        : () => null
                }
                className={`${activeLikeId ? "opacity-100" : "opacity-50"} h-6 w-6 text-red-500 hover:opacity-100 cursor-pointer duration-300 active:scale-75`}
            />
            <span className="font-semibold">{likes?.length}</span>
        </div>
    );
}
