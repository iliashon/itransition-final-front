"use client";

import { useEffect, useState } from "react";
import TCommentList from "@/types/comment/TCommentList";
import CommentService from "@/services/comment.service";
import { Avatar, Button } from "@material-tailwind/react";
import CreateComment from "@/components/form/CreateComment";
import getUserData from "@/utils/getUserData";
import TUserData from "@/types/auth/TUserData";

export default function CommentBlock({ item_id }: { item_id: number }) {
    const [userData, setUserData] = useState<TUserData | null>();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<TCommentList[]>();

    useEffect(() => {
        setUserData(getUserData());
        CommentService.getByItemId(item_id).then((res) => {
            setComments(res.data);
            setLoading(false);
        });
    }, []);

    const handleCreateComment = (comment: TCommentList) => {
        setComments(comments?.concat([comment]));
    };

    return (
        <div className="my-5">
            <h2 className="text-xl font-semibold text-center">
                {comments?.length} Comments
            </h2>
            <div className="flex flex-col mt-5 gap-5">
                {loading
                    ? "Loading..."
                    : comments?.map((comment) => {
                          return (
                              <div className="flex gap-3" key={comment.id}>
                                  {comment.user.image_url ? (
                                      <Avatar
                                          src={comment.user.image_url}
                                          variant="rounded"
                                          className="w-10"
                                      />
                                  ) : (
                                      <span className="rounded-lg border dark:border-white/30 border-black/30 px-3 h-10 text-sm flex items-center justify-center">
                                          {`${comment.user.first_name.slice(0, 1)}${comment.user.last_name.slice(0, 1)}`}
                                      </span>
                                  )}
                                  <div className="flex flex-col gap-1">
                                      <div className="font-semibold text-sm flex gap-1">
                                          <span>{comment.user.first_name}</span>
                                          <span>{comment.user.last_name}</span>
                                          <span>-</span>
                                          <span className="text-gray-600 text-[12px]">
                                              {new Date(
                                                  comment.created_at,
                                              ).toDateString()}
                                          </span>
                                      </div>
                                      <p className="text-gray-500 text-sm">
                                          {comment.text}
                                      </p>
                                  </div>
                              </div>
                          );
                      })}
            </div>
            {userData && (
                <CreateComment
                    item_id={item_id}
                    handleCreate={handleCreateComment}
                    userData={userData}
                />
            )}
        </div>
    );
}
