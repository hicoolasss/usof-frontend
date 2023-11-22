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

export default function Comment({ commentId, user }) {
    const [authorId, setAuthorId] = React.useState(null); // [author_id, setAuthorId
    const [author, setAuthor] = React.useState(null);
    const [comment, setComment] = React.useState(null);

    React.useEffect(() => {
        const getCommentById = async () => {
            try {
                const response = await store.getCommentById(commentId);
                setComment(response.data.data);
                setAuthorId(response.data.data.author_id);
            } catch (error) {
                console.error(error);
            }
        };

        getCommentById(getCommentById);
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

    const authorAvatarSrc = author ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${author.profile_picture_path}` : '/placeholder.svg';
    return (
        <div className="border-ring border-2 border-opacity-50 p-4 bg-secondary_background_color rounded-lg relative ">
            <div className="flex items-center space-x-2">
                <Avatar className="h-9 w-9">
                    <AvatarImage alt="User Avatar" src={authorAvatarSrc} />
                    <AvatarFallback>UN</AvatarFallback>
                </Avatar>
                <div>
                    {author && <h3 className="text-lg font-bold text-color">{author.login}</h3>}
                    {comment && <p className="text-sm font-bold text-accent_color">
                        {new Date(comment.publish_date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                        })}</p>}
                </div>
            </div>
            {comment && <p className="mt-5">{comment.content}</p>}
            <div className="absolute top-5 right-5 flex items-center space-x-2">
                <Button size="icon" variant="ghost" >
                    <Heart className="w-5 h-5" />
                </Button>
                {(authorId === user.id || user.role === "admin") && (
                    <Button variant="destructive" size="icon">
                        <Trash className="w-5 h-5" />
                    </Button>
                )}
            </div>
        </div>
    )
}