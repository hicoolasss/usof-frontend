import React, { use } from "react"
import Image from "next/image"
import store from "@/store/store"
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar"
import { Skeleton } from "./ui/skeleton"
import { useEffect } from "react"
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Separator } from "./ui/separator"


export function Post({ post }) {
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


    return (
        <div className="space-y-4 bg-secondary_background_color rounded-lg p-5 ">
            <h2 className="text-xl font-bold">{post.title}</h2>
            {/* <ReactMarkdown className="prose dark:prose-dark" remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown> */}
            {category && <p className="text-highlight">{category.title} </p>}
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
                    {author && <p className="text-xl text-color font-bold"> {author.login} </p>}
                </div>
                <div className="flex space-x-2">
                    
                    <p className="text-accent_color font-bold">
                        {new Date(post.publish_date).toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    )
}