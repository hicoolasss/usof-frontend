/**
 * v0 by Vercel.
 * @see https://v0.dev/t/rvDhDittPGA
 */
"use client";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/theme-swithcer"
import Image from "next/image"
import { useState, useEffect, useMemo } from "react"

import { Input } from "@/components/ui/input"
import { Search } from "iconoir-react"

import { useStore } from '@/store/storeContext';
import { useLogout } from "../page";


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
    Plus,
    Filter,
    FilterX,
} from "lucide-react"
import Filters from "@/components/filters";

import { HomeSimple, ShareIos, Telegram, Instagram } from "iconoir-react";

import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "sonner";

import { Post } from "@/components/post";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"


export default function Component() {

    const store = useStore();

    const logout = useLogout();

    const [isLoading, setIsLoading] = useState(true);

    const [user, setUser] = useState(store.user);

    const [posts, setPosts] = useState([]);

    const [searchText, setSearchText] = useState('');

    const [currentPage, setCurrentPage] = useState(1);

    const postsPerPage = 10; // Здесь вы можете установить количество постов на странице

    const [showFilters, setShowFilters] = useState(false);

    const [isAsyncLoading, setIsAsyncLoading] = useState(false);

    const [filters, setFilters] = useState({
        creationDate: '',
        category: '',
        titleSortBy: '',
        likesSortBy: '',
        commentsSortBy: '',
        author: '',
        authorsSortBy: '',
    });

    const [sortedPosts, setSortedPosts] = useState([]);
    // Функция для переключения состояния отображения секции фильтров
    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };


    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        console.log("home user data:", storedUserData);

        if (storedUserData) {
            // Инициализируем состояние данными пользователя из localStorage
            setUser(JSON.parse(storedUserData));
            setIsLoading(false);
        }
    }, []);

    const getPosts = async () => {

        try {
            setIsAsyncLoading(true);
            const response = await store.getPosts();
            console.log("posts", response.data.data);
            setPosts(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setIsAsyncLoading(false);
            toast.success("Posts loaded");
        }
    }

    useEffect(() => {
        getPosts();
    }, []);

    const getStartOfWeek = (date) => {
        const startOfWeek = new Date(date);
        startOfWeek.setDate(date.getDate() - date.getDay());
        startOfWeek.setHours(0, 0, 0, 0);
        return startOfWeek;
    };

    const getEndOfWeek = (date) => {
        const endOfWeek = new Date(date);
        endOfWeek.setDate(date.getDate() + (6 - date.getDay()));
        endOfWeek.setHours(23, 59, 59, 999);
        return endOfWeek;
    };


    const isPostInSelectedDate = (post, selectedDate) => {
        const today = new Date();
        const postDate = new Date(post.publish_date);

        switch (selectedDate) {
            case 'today':
                return postDate.toDateString() === today.toDateString();
            case 'thisWeek':
                // Проверка, что postDate находится в текущей неделе
                return postDate >= getStartOfWeek(today) && postDate <= getEndOfWeek(today);
            case 'thisMonth':
                // Проверка, что postDate находится в текущем месяце
                return postDate.getMonth() === today.getMonth() && postDate.getFullYear() === today.getFullYear();
            case 'thisYear':
                return postDate.getFullYear() === today.getFullYear();
            default:
                return true; // Если не выбрано значение, то не фильтровать по дате
        }
    };

    const sortPosts = async (posts, filters) => {
        // Filter and fetch authors
        const filteredPostsByAuthorId = await Promise.all(
            posts.map(async (post) => {
                const authorInfo = await store.getUserById(post.author_id);

                // Check if the author's login matches the filter
                if (filters.author && authorInfo.login &&
                    authorInfo.login.toLowerCase() !== filters.author.toLowerCase()) {
                    return null; // Exclude this post
                }

                return post; // Include this post
            })
        );

        // Remove posts that were set to null
        const filteredPostsWithoutNull = filteredPostsByAuthorId.filter(post => post !== null);

        // Apply other filters and sort
        return filteredPostsWithoutNull.filter(post => {
            // Apply additional filters, for example by category
            if (filters.category && post.categories[0] !== filters.category) {
                return false;
            }

            // Filter by creation date if applicable
            if (filters.creationDate && !isPostInSelectedDate(post, filters.creationDate)) {
                return false;
            }

            return true;
        }).sort((a, b) => {
            // Apply sorting logic
            if (filters.titleSortBy === "asc") {
                return a.title.localeCompare(b.title);
            } else if (filters.titleSortBy === "desc") {
                return b.title.localeCompare(a.title);
            } else if (filters.likesSortBy === "asc") {
                return a.likes.length - b.likes.length;
            } else if (filters.likesSortBy === "desc") {
                return b.likes.length - a.likes.length;
            } else if (filters.commentsSortBy === "asc") {
                return a.comments.length - b.comments.length;
            } else if (filters.commentsSortBy === "desc") {
                return b.comments.length - a.comments.length;
            } else if (filters.authorsSortBy === "asc") {
                return a.author_id.localeCompare(b.author_id);
            } else if (filters.authorsSortBy === "desc") {
                return b.author_id.localeCompare(a.author_id);
            }

            return 0; // Default case if no sorting is specified
        });
    };

    useEffect(() => {
        // Define an async function inside the effect
        const fetchSortedPosts = async () => {
            // First, filter the posts synchronously
            const filteredPosts = posts.filter((post) =>
                post.title.toLowerCase().includes(searchText.toLowerCase())
            );

            // Then, sort the posts asynchronously
            const sorted = await sortPosts(filteredPosts, filters);
            setSortedPosts(sorted);
        };

        // Call the async function
        fetchSortedPosts();
    }, [posts, searchText, filters]); // Dependencies for the effect

    // Now, you can use `sortedPosts` with `.slice()` because it's guaranteed to be an array
    const paginatedPosts = useMemo(() => {
        const indexOfLastPost = currentPage * postsPerPage;
        const indexOfFirstPost = indexOfLastPost - postsPerPage;
        return sortedPosts.slice(indexOfFirstPost, indexOfLastPost);
    }, [currentPage, sortedPosts, postsPerPage]);

    return (
        <div className="relative flex flex-col min-h-screen bg-background ">
            <header className="w-full h-16 px-4 flex fixed z-50 lg:px-6 items-center justify-between bg-background  border-b border-zinc-200 dark:border-zinc-800">
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
                        <AvatarImage src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${user.profile_picture_path}`} style={{ objectFit: "cover" }} quality={100} />
                        <AvatarFallback>
                            <Skeleton />
                        </AvatarFallback>

                    </Avatar>
                </div>
            </header>
            <main className="flex-grow py-8 px-4 md:px-6 mt-10 ">
                <section className="max-w-3xl mx-auto space-y-8">
                    {(paginatedPosts.length >= 1) && user &&
                        paginatedPosts
                            .map((post) => <Post key={post._id} post={post} user={user} posts={paginatedPosts} setPosts={setPosts} />)
                    }
                    {posts && posts.length === 0 ? (
                        <p className="text-3xl font-bold text-warning self-center">Loading...</p>
                    ) : (
                        <>
                            {paginatedPosts.length == 0 && (
                                <p className="text-3xl font-bold text-warning self-center">No matching posts found</p>
                            )}
                        </>
                    )}
                    <div className="flex justify-between">
                        {paginatedPosts.length > 1 && (
                            <Button
                                onClick={() => setCurrentPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                variant="outline"
                            >
                                Previous
                            </Button>
                        )}
                        {paginatedPosts.length > 1 && (
                            <Button
                                onClick={() => setCurrentPage(currentPage + 1)}
                                disabled={paginatedPosts.length < postsPerPage}

                            >
                                Next
                            </Button>
                        )}
                    </div>
                </section>

                <div className="absolute top-20 right-10 z-10 flex items-center space-x-3">
                    <p className="text-xl font-semibold">
                        {!showFilters ? ("Show filters") : ("")}
                    </p>
                    <Button variant="outline" size="icon" onClick={toggleFilters}>
                        {!showFilters ? (<Filter className="w-5 h-5" />) : (<FilterX className="w-5 h-5" />)}
                    </Button>
                </div>

                {showFilters && <Filters filters={filters} setFilters={setFilters} />}
            </main>
            <footer className="w-full h-16 px-4 md:px-6 flex items-center justify-between border-t border-zinc-200 dark:border-zinc-800">
                <p className="text-sm text-zinc-500 dark:text-zinc-400">© 2023 Company Name. All rights reserved.</p>
                <nav className="hidden lg:flex space-x-4">
                    <Link
                        className="text-sm text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        href="#"
                    >
                        Terms
                    </Link>
                    <Link
                        className="text-sm text-zinc-600 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
                        href="#"
                    >
                        Privacy
                    </Link>
                </nav>
            </footer>
        </div>
    )
}