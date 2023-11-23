"use client";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"
import React from "react";
import store from "@/store/store";
import { Button } from "./ui/button";
import { Heart, Trash } from "lucide-react";
// import { Heart } from "iconoir-react";
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuSub,
    ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger,
} from "@/components/ui/context-menu"

export default function Comment({ commentId, user, comments, setComments }) {
    const [authorId, setAuthorId] = React.useState(null); // [author_id, setAuthorId
    const [author, setAuthor] = React.useState(null);
    const [comment, setComment] = React.useState(null);
    const [isLiked, setIsLiked] = React.useState(false);
    const [likes, setLikes] = React.useState(0); // [likes, setLikes

    React.useEffect(() => {
        const getCommentById = async () => {
            try {
                const response = await store.getCommentById(commentId);
                setComment(response.data.data);
                setAuthorId(response.data.data.author_id);
                setLikes(response.data.data.likes.length);
                response.data.data.likes.forEach((like) => {
                    if (like === user.id) {
                        setIsLiked(true);
                    }
                })

            } catch (error) {
                console.error(error);
            }
        };

        getCommentById();
    }, [commentId]);

    React.useEffect(() => {
        const getUserById = async () => {
            try {
                if (authorId) {
                    // Assuming store.getUserById returns a promise
                    const response = await store.getUserById(authorId);
                    setAuthor(response); // Assuming the response has a data property
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserById();
    }, [authorId]);

    const handleLikeComment = async () => {
        try {
            if (isLiked) {
                // Если пост уже лайкнут, отправьте запрос на дизлайк
                const response = await store.likeComment(commentId);
                console.log("unlike:", response);
                setLikes(likes - 1)

            } else {
                const response = await store.likeComment(commentId);
                console.log("like:", response);
                setLikes(likes + 1)
            }
            // После успешного выполнения запроса, обновите состояние isPostLiked
            setIsLiked(!isLiked);
        } catch (error) {
            console.error(error);
        }
    }

    const handleDeleteComment = async () => {
        try {
            const response = await store.deleteCommentById(commentId);
            console.log("delete:", response);
            const updatedComments = comments.filter((c) => c !== commentId);
            setComments(updatedComments);
            console.log("updatedComments:", updatedComments);
        } catch (error) {
            console.error(error);
        }
    }

    const authorAvatarSrc = author ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${author.profile_picture_path}` : '/placeholder.svg';
    return (
        <div>
            <div className="border-ring border-2 border-opacity-50 p-4 bg-secondary_background_color rounded-lg relative ">
                <div className="flex items-center space-x-2">
                    <Avatar className="h-9 w-9">
                        <AvatarImage alt="User Avatar" src={authorAvatarSrc} />
                        <AvatarFallback>UN</AvatarFallback>
                    </Avatar>
                    <div>
                        {author && <h3 className="text-lg font-bold text-color">

                            {author._id === user.id ? `${author.login} - You` : `${author.login}`}

                        </h3>}

                        {comment && <p className="text-sm font-bold text-accent_color">
                            {new Date(comment.publish_date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                            })}</p>}
                    </div>
                </div>
                {comment && <p className="mt-5">{comment.content}</p>}
                <div className="absolute top-5 right-5 flex flex-col items-center">
                    <div className="flex items-start space-x-1 ">
                        <div className="flex flex-col items-center">
                            <Button size="icon" variant="ghost" onClick={handleLikeComment}>
                                {isLiked ? (<>
                                    <svg
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        color="#ffffff"
                                        strokeWidth="1.2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            clipRule="evenodd"
                                            d="M11.9999 3.94228C13.1757 2.85872 14.7069 2.25 16.3053 2.25C18.0313 2.25 19.679 2.95977 20.8854 4.21074C22.0832 5.45181 22.75 7.1248 22.75 8.86222C22.75 10.5997 22.0831 12.2728 20.8854 13.5137C20.089 14.3393 19.2938 15.1836 18.4945 16.0323C16.871 17.7562 15.2301 19.4985 13.5256 21.14L13.5216 21.1438C12.6426 21.9779 11.2505 21.9476 10.409 21.0754L3.11399 13.5136C0.62867 10.9374 0.62867 6.78707 3.11399 4.21085C5.54605 1.68984 9.46239 1.60032 11.9999 3.94228Z"
                                            fill="#ffffff"
                                        />
                                    </svg>
                                </>
                                ) : (<Heart />)}
                            </Button>
                            <p className="font-bold text-cyan">{likes}</p>
                        </div>
                            {(authorId === user.id || user.role === "admin") && (
                                <Button variant="destructive" size="icon" onClick={handleDeleteComment}>
                                    <Trash className="w-5 h-5" />
                                </Button>
                            )}
                    </div>
                </div>
            </div>

        </div>
    )
}