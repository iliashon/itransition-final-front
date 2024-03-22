"use client";

import { useEffect, useState } from "react";
import TCommentList from "@/types/comment/TCommentList";
import CommentService from "@/services/comment.service";
import CreateComment from "@/components/view/CreateComment";
import getUserData from "@/utils/getUserData";
import TUserData from "@/types/user/TUserData";
import Avatar from "@/components/view/Avatar";
import { useTranslation } from "react-i18next";

export default function CommentBlock({ item_id }: { item_id: number }) {
    const [userData, setUserData] = useState<TUserData | null>();
    const [loading, setLoading] = useState(true);
    const [comments, setComments] = useState<TCommentList[]>();
    const { t } = useTranslation();

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
        <div className="max-w-[700px] mx-auto mt-5">
            <h2 className="text-2xl font-semibold text-center">
                {comments?.length} {t("comment")}
            </h2>
            <div className="flex flex-col mt-5 gap-5">
                {loading
                    ? "Loading..."
                    : comments?.map((comment) => {
                          return (
                              <div className="flex gap-3" key={comment.id}>
                                  <Avatar
                                      image_url={comment.user.image_url}
                                      fullName={{
                                          firstName: comment.user.first_name,
                                          lastName: comment.user.last_name,
                                      }}
                                  />
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
