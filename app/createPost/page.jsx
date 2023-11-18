import { Button } from "@/components/ui/button"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { TextareaWithMarkdown } from "@/components/ui/textarea"
import { Slash } from "iconoir-react"
import Link from "next/link"
export default function Component() {
    return (
        <div className="bg-background h-full min-h-screen p-6">
            <div className="absolute left-5 top-5 flex flex-row">
                <Button variant="link" className="text-xl font-bold text-color left-5 top-5 p-0" href="#">
                    <svg
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

                    <Link href="/" className="ml-1">Smack Overslow</Link>
                    <Slash />
                </Button>
                <Button variant="link" className="text-xl font-bold text-color p-0">
                    <Link href="/createPost">New Post</Link>
                </Button>

            </div>
            <div className="max-w-4xl mx-auto mt-16">
                <h1 className="text-4xl text-white font-bold mb-4">Create Post</h1>
                <div className="rounded-lg shadow p-6 border-solid border-2 border-ring border-opacity-50">
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2" htmlFor="title">
                        Title
                    </label>
                    <Input
                        className="block w-full p-2 border border-gray-300 rounded mb-4 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        id="title"
                        type="text"
                    />
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2" htmlFor="description">
                        Description
                    </label>
                    <TextareaWithMarkdown
                        className="block w-full p-2 border border-gray-300 rounded mb-4 h-24 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                        id="description"
                    />
                    {/* here */}
                    <label className="block text-sm text-gray-700 dark:text-gray-300 mb-2" htmlFor="categories">
                        Categories
                    </label>
                    <Select>
                        <SelectTrigger className="w-full">
                            <SelectValue
                                className="block w-full p-2 rounded text-color"
                                placeholder="Select categories"
                            />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="tech">Technology</SelectItem>
                                <SelectItem value="health">Health</SelectItem>
                                <SelectItem value="sport">Sport</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    <Button className="mt-4 w-full" type="submit">
                        Create Post
                    </Button>
                </div>
            </div>
        </div>)
}