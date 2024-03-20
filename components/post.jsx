import React, { use } from "react"
import Image from "next/image"
import store from "@/store/store"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"
import { useEffect } from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Separator } from "./ui/separator"
import Link from "next/link"
import { Button } from "./ui/button"
import { Trash } from "lucide-react"

export function Post({ post, user, posts, setPosts }) {
    const [author, setAuthor] = React.useState(null);
    const [category, setCategory] = React.useState(null);

    React.useEffect(() => {
        const getUserById = async () => {
            try {
                // Assuming store.getUserById returns a promise
                const response = await store.getUserById(post.author_id);
                setAuthor(response); // Assuming the response has a data property
            } catch (error) {
                console.error(error);
            }
        };

        if (post.author_id) {
            getUserById();
        }
    }, [post.author_id]); // Dependency array



    React.useEffect(() => {
        const getCategoryById = async (categoryId) => {
            try {
                // Assuming store.getUserById returns a promise
                const response = await store.getCategoryById(categoryId);
                setCategory(response); // Assuming the response has a data property
                console.log("category:", response);
            } catch (error) {
                console.error(error);
            }
        };

        if (post.categories) {
            getCategoryById(post.categories[0]);
        }
    }, [post.categories]); // Dependency array

    if (!post) {
        // Render nothing or a loading state if `post` is not available
        return null;
    }

    // Now we use 'author' state for the image source
    const avatarSrc = author ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${author.profile_picture_path}` : '/placeholder.svg';

    const handleDeletePost = async () => {
        try {
            const response = await store.deletePost(post._id);
            console.log("delete:", response);
            const updatedPosts = posts.filter((p) => p._id !== post._id);
            setPosts(updatedPosts);
            console.log("updatedPosts:", updatedPosts);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="space-y-4 bg-secondary_background_color rounded-lg p-5 relative ">
            <Link className="text-xl font-bold" href={`/posts/${post._id}`}>{post.title}</Link>
            {/* <ReactMarkdown className="prose dark:prose-dark" remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown> */}
            {category && <p className="text-highlight">{category.title}</p>}
            <Separator className="my-4 " />
            <div className="flex items-center justify-between">
                <div className="space-x-2 flex flex-row items-center">
                    <Avatar className="rounded-full w-10 h-10">
                        <AvatarImage
                            src={avatarSrc}
                            alt="Author's Avatar"
                            style={{ objectFit: "cover" }}
                            quality={100}
                        />
                        <AvatarFallback>
                            <Skeleton />
                        </AvatarFallback>
                    </Avatar>
                    {author && <p className="text-xl text-color font-bold max-w-[120px] lg:max-w-none break-words"> {author.login} </p>}
                </div>

                <div className="flex space-x-2 items-center">

                    <p className="text-accent_color font-bold text-sm">
                        {new Date(post.publish_date).toLocaleDateString()}
                    </p>
                    <div className="flex flex-col">
                        <p className="text-accent_color font-bold text-sm">{`${post.likes.length} Likes`}</p>
                        <p className="text-accent_color font-bold text-sm">{`${post.comments.length} Comments`} </p>
                    </div>
                </div>

            </div>
            {author && user && (author._id === user.id || user.role === "admin") && (
                <Button variant="destructive" size="icon" className="absolute lg:top-5 lg:right-5 top-10 right-5" onClick={handleDeletePost} >
                    <Trash className="w-5 h-5" />
                </Button>
            )}
        </div>
    )
}