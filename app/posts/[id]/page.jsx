"use client"
import React from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-swithcer"

import { Input } from "@/components/ui/input"
import { Search } from "iconoir-react"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"


import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Facebook,
    User,
    UserPlus,
    Users,
    MenuIcon,
    X,
    ArrowLeft,
    Heart,
    Plus
} from "lucide-react"

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { HomeSimple, ShareIos, Telegram, Instagram } from "iconoir-react";
import { toast } from "sonner"
import { Skeleton } from "@/components/ui/skeleton"
import store from "@/store/store"
import { useLogout } from "@/app/page"
import { useRouter } from "next/navigation"

import Comment from "@/components/comment"
import { Comme } from "next/font/google"
export default function Page({ params: { id } }) {
    const [post, setPost] = React.useState(null);
    const [author, setAuthor] = React.useState(null);
    const [category, setCategory] = React.useState(null);
    const [searchText, setSearchText] = React.useState('');
    const [user, setUser] = React.useState(null);

    const [comment, setComment] = React.useState('');
    const [commentMessage, setCommentMessage] = React.useState('');

    const logout = useLogout();
    const router = useRouter();

    React.useEffect(() => {
        const getPostById = async () => {
            try {
                // Assuming store.getUserById returns a promise
                const response = await store.getPostById(id);
                console.log("response:", response);
                setPost(response.data.data); // Assuming the response has a data property
            } catch (error) {
                console.error(error);
            }
        }

        getPostById(id);
    }, [id, comment]); // Dependency array

    React.useEffect(() => {
        const getUserById = async () => {
            try {
                if (post && post.author_id) {
                    // Assuming store.getUserById returns a promise
                    const response = await store.getUserById(post.author_id);
                    setAuthor(response); // Assuming the response has a data property
                }
            } catch (error) {
                console.error(error);
            }
        };

        getUserById();
    }, [post]);

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

        if (post && post.categories) {
            getCategoryById(post.categories[0]);
        }
    }, [post]);

    React.useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log('storedUserData', storedUserData);

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUser(userData);
        } else {
            toast.error('Please log in to check your profile!');
            router.push('/login');
        }
    }, []);



    const handleCreateComment = async () => {
        try {
            // Assuming store.getUserById returns a promise
            const response = await store.createComment(commentMessage, id, user.id);
            const newComment = response.data.data.comment._id;

            // Добавляем новый комментарий в конец массива
            setComment((prevComments) => [...prevComments, newComment]);
            console.log("comment:", response);
        } catch (error) {
            console.error(error);
        } finally {
            setCommentMessage('');
        }
    }


    if (!post) {
        // Render nothing or a loading state if `post` is not available
        return null;
    }


    const userAvatarSrc = user ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.profile_picture_path}` : '/placeholder.svg';

    return (
        <>
            <header className="w-full h-16 px-4 lg:px-6 flex fixed items-center justify-between bg-background  border-b border-zinc-200 dark:border-zinc-800">
                <div className="relative flex items-center ">
                    <nav className="hidden lg:flex lg:w-full space-x-0  lg:space-x-8">
                        <Button variant="link" className="text-xl font-bold text-color " href="#">
                            <svg className="mr-1"
                                xmlns="http://www.w3.org/2000/svg"
                                width="24px"
                                height="24px"
                                fill="none"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                                color="var(--color)"
                            >
                                <rect
                                    width={7}
                                    height={5}
                                    x={3}
                                    y={2}
                                    stroke="var(--color)"
                                    strokeWidth="2"
                                    rx="0.6"
                                />
                                <rect
                                    width={7}
                                    height={5}
                                    x="8.5"
                                    y={17}
                                    stroke="var(--color)"
                                    strokeWidth="2"
                                    rx="0.6"
                                />
                                <rect
                                    width={7}
                                    height={5}
                                    x={14}
                                    y={2}
                                    stroke="var(--color)"
                                    strokeWidth="2"
                                    rx="0.6"
                                />
                                <path
                                    stroke="var(--color)"
                                    strokeWidth="2"
                                    d="M6.5 7v3.5a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V7M12 12.5V17"
                                />
                            </svg>
                            <Link href="/">Smack Overslow</Link>

                        </Button>
                        {user ? (
                            <Link href="/profile">
                                <Button
                                    variant="ghost"
                                    className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                                >
                                    Profile
                                </Button>
                            </Link>
                        ) : null}

                        <Link href="/users">
                            <Button
                                variant="ghost"
                                className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                            >
                                Users
                            </Button>
                        </Link>

                        {user ? (
                            <Link href="/createPost">
                                <Button
                                    variant="ghost"
                                    className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                                >
                                    New Post
                                </Button>
                            </Link>
                        ) : null}

                        <div className="relative justify-self-start hidden lg:flex md:flex items-center w-64 ml-8 md:ml-0 lg:ml-8 xl:ml-8">
                            <Button variant="ghost" size="icon" className="absolute"><Search className="w-5 h-5" /></Button>

                            <Input className="indent-8"
                                placeholder="Search"
                                value={searchText}
                                onChange={(e) => setSearchText(e.target.value)}
                            >
                            </Input>
                        </div>
                    </nav>
                    <nav className="lg:hidden flex">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild >
                                <Button variant="ghost" size="icon" >
                                    <MenuIcon />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56" >
                                <DropdownMenuLabel>Posts</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link href="/profile" className="flex flexs-row items-center">
                                            <User className="mr-2 h-4 w-4" />
                                            Profile
                                        </Link>

                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/" className="flex flexs-row items-center">
                                            <HomeSimple className="mr-2 h-4 w-4" />
                                            Home
                                        </Link>

                                    </DropdownMenuItem>

                                </DropdownMenuGroup>

                                <DropdownMenuItem>
                                    <Link href="/users" className="flex flexs-row items-center">
                                        <Users className="mr-2 h-4 w-4" />
                                        <span>Users</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Link href="/createPost" className="flex flexs-row items-center">
                                        <Plus className="mr-2 h-4 w-4" />
                                        <span>New Post</span>
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuSub>
                                    <DropdownMenuSubTrigger>
                                        <ShareIos className="mr-2 h-4 w-4" />
                                        <span>Socials</span>
                                    </DropdownMenuSubTrigger>
                                    <DropdownMenuPortal>
                                        <DropdownMenuSubContent>
                                            <DropdownMenuItem>
                                                <Link href="https://web.telegram.org/#/im?p=@hicoolasss" target="_blank" className="flex flexs-row items-center">
                                                    <Telegram className="mr-2 h-4 w-4" />
                                                    <span>Telegram</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="https://www.instagram.com/hicoolasss/" target="_blank" className="flex flexs-row items-center">
                                                    <Instagram className="mr-2 h-4 w-4" />
                                                    <span>Instagram</span>
                                                </Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Link href="https://github.com/hicoolasss" target="_blank" className="flex flexs-row items-center">
                                                    <Github className="mr-2 h-4 w-4" />
                                                    <span>Github</span>
                                                </Link>
                                            </DropdownMenuItem>
                                        </DropdownMenuSubContent>
                                    </DropdownMenuPortal>
                                </DropdownMenuSub>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={logout}>
                                    <LogOut className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </nav>
                </div>


                <div className="flex items-center space-x-4 lg:space-x-4">
                    <div ><ModeToggle /></div>
                    {user ? (
                        <Button className="hidden lg:inline-flex " variant="outline" onClick={logout}>
                            Sign Out
                        </Button>) : (
                        <Button variant="ghost"
                            className="text-base font-medium text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                    )
                    }
                    <Avatar>
                        <AvatarImage src={userAvatarSrc} style={{ objectFit: "cover" }} quality={100} />
                        <AvatarFallback>
                            <Skeleton />
                        </AvatarFallback>

                    </Avatar>
                </div>
            </header>
            <section>
                <div className="text-color px-4 py-6 md:px-6 md:py-12 lg:py-16">
                    <div className="flex justify-between items-center mt-5">
                        <Link href="/posts">
                            <Button className="text-gray-600 dark:text-white" variant="outline">
                                <ArrowLeft className="w-5 h-5 mr-2" />
                                Back to Posts
                            </Button>
                        </Link>
                    </div>
                    <article className="max-w-3xl mx-auto">
                        <div className="space-y-5 mb-6">
                            <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">{post.title}</h1>
                            <div>
                                <div className="flex items-center">
                                    <div className="flex items-center">
                                        <div className="flex flex-row items-center">
                                            {author && <p className="text-sm">@{author.login}</p>}
                                            <span className="mx-1 ml-4">•</span>
                                            {category && <p className="text-sm text-highlight">{category.title}</p>}
                                            <span className="mx-1 ml-4">•</span>
                                        </div>
                                    </div>
                                    <p className="text-sm text-accent_color font-bold">
                                        {new Date(post.publish_date).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric',
                                        })}
                                    </p>
                                    <Button className="ml-4" size="icon" variant="ghost">
                                        <Heart className="w-5 h-5" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                        <ReactMarkdown className="prose dark:prose-dark" remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
                    </article>
                </div>
            </section>
            <section className="max-w-3xl mx-auto mt-10 pt-6">
                {post && <h2 className="text-2xl font-bold mb-4">{`Comments (${post.comments.length})`}</h2>}
                <div className="space-y-4">
                    {/* <div className="border-ring border-2 border-opacity-50 p-4 bg-secondary_background_color rounded-lg space-y-2">
                        <div className="flex items-center space-x-2">
                            <Avatar className="h-9 w-9">
                                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                                <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold">User Name</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-300">Nov 22, 2023</p>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt.</p>
                    </div>
                    <div className="border-ring border-2 border-opacity-50 p-4 bg-secondary_background_color rounded-lg space-y-2">
                        <div className="flex items-center space-x-2">
                            <Avatar className="h-9 w-9">
                                <AvatarImage alt="User Avatar" src="/placeholder-avatar.jpg" />
                                <AvatarFallback>UN</AvatarFallback>
                            </Avatar>
                            <div>
                                <h3 className="text-lg font-bold">User Name</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-300">Nov 22, 2023</p>
                            </div>
                        </div>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas tincidunt.</p>
                    </div> */}

                    {post.comments.map((commentId) => (<Comment key={commentId} commentId={commentId} user={user} />))}
                </div>
            </section>
            <footer className="max-w-3xl mx-auto mt-6 mb-16">
                <div className="flex flex-col">
                    <div className="flex flex-row space-x-2">
                        <Input
                            placeholder="Add a comment..."
                            type="text"
                            value={commentMessage}
                            onChange={(e) => setCommentMessage(e.target.value)}
                        />
                        <Button onClick={handleCreateComment}>Add</Button>
                    </div>
                </div>
            </footer>
        </>
    );
}