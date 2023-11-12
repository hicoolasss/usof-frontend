"use client";
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes";
export default function Component() {

    const { theme } = useTheme();
    return (
        <div className="flex flex-col min-h-screen bg-background">

            <main className="flex flex-col items-center justify-center flex-grow p-10 space-y-5">
                <h1 className="text-3xl font-bold">Email Verification</h1>
                <p className="max-w-md text-center text-zinc-500 dark:text-zinc-400">
                    We have sent a verification link to your email. Please check your inbox and click the link to verify your
                    email.
                </p>
                <div className="w-full max-w-sm space-y-5 flex items-center flex-col">
                    {(theme === "dark" && <svg className="mt-5"
                        width={450}
                        height={450}
                        viewBox="0 0 450 450"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect width={450} height={450} fill="url(#paint0_linear_4_127)" />
                        <path
                            d="M225.845 324.199C171.516 324.199 127.482 280.165 127.482 225.836C127.482 171.516 171.516 127.482 225.845 127.482C280.165 127.482 324.199 171.516 324.199 225.836C324.199 280.165 280.165 324.199 225.845 324.199Z"
                            stroke="#3D3D3D"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M225 267.553C201.496 267.553 182.447 248.504 182.447 225C182.447 201.505 201.496 182.447 225 182.447C248.495 182.447 267.553 201.505 267.553 225C267.553 248.504 248.495 267.553 225 267.553Z"
                            stroke="#3D3D3D"
                            strokeWidth="1.5"
                        />
                        <path
                            d="M218.5 220.5L226 225.5L233.5 220.5"
                            stroke="#3D3D3D"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M208.5 228H211.833"
                            stroke="#3D3D3D"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M205.167 223H211.833"
                            stroke="#3D3D3D"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M211.833 218V217.167C211.833 215.326 213.326 213.833 215.167 213.833H236.833C238.674 213.833 240.167 215.326 240.167 217.167V233.833C240.167 235.674 238.674 237.167 236.833 237.167H215.167C213.326 237.167 211.833 235.674 211.833 233.833V233"
                            stroke="#3D3D3D"
                            strokeWidth={2}
                            strokeLinecap="round"
                        />
                        <path
                            d="M100 100C121.811 121.811 155.851 155.851 155.851 155.851C155.851 155.851 179.625 179.625 194.858 194.858M225 100V125.709V182.447M350 100L295.035 154.965L255.142 194.858M350 225H324.291L267.553 225M350 350L295.035 295.035L255.142 255.142M225 350V322.518V267.553M100 350L155.851 294.149L194.858 255.142M100 225H127.482H182.447"
                            stroke="url(#paint1_linear_4_127)"
                            strokeWidth={2}
                        />
                        <defs>
                            <linearGradient
                                id="paint0_linear_4_127"
                                x1={0}
                                y1={225}
                                x2={491}
                                y2={225}
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopOpacity={0} />
                                <stop offset="0.46311" stopColor="#0A0A0B" />
                                <stop offset={1} stopOpacity={0} />
                            </linearGradient>
                            <linearGradient
                                id="paint1_linear_4_127"
                                x1={100}
                                y1={225}
                                x2={350}
                                y2={225}
                                gradientUnits="userSpaceOnUse"
                            >
                                <stop stopColor="#3D3D3D" stopOpacity={0} />
                                <stop offset="0.498958" stopColor="#3D3D3D" stopOpacity="0.55" />
                                <stop offset={1} stopColor="#3D3D3D" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                    </svg>)}
                    {(theme === "light" &&
                        <svg
                            width={450}
                            height={450}
                            viewBox="0 0 450 450"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect width={450} height={450} fill="white" />
                            <path
                                d="M225.845 324.199C171.516 324.199 127.482 280.165 127.482 225.836C127.482 171.516 171.516 127.482 225.845 127.482C280.165 127.482 324.199 171.516 324.199 225.836C324.199 280.165 280.165 324.199 225.845 324.199Z"
                                stroke="#3D3D3D"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M225 267.553C201.496 267.553 182.447 248.504 182.447 225C182.447 201.505 201.496 182.447 225 182.447C248.495 182.447 267.553 201.505 267.553 225C267.553 248.504 248.495 267.553 225 267.553Z"
                                stroke="#3D3D3D"
                                strokeWidth="1.5"
                            />
                            <path
                                d="M218.5 220.5L226 225.5L233.5 220.5"
                                stroke="#3D3D3D"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M208.5 228H211.833"
                                stroke="#3D3D3D"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M205.167 223H211.833"
                                stroke="#3D3D3D"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M211.833 218V217.167C211.833 215.326 213.326 213.833 215.167 213.833H236.833C238.674 213.833 240.167 215.326 240.167 217.167V233.833C240.167 235.674 238.674 237.167 236.833 237.167H215.167C213.326 237.167 211.833 235.674 211.833 233.833V233"
                                stroke="#3D3D3D"
                                strokeWidth={2}
                                strokeLinecap="round"
                            />
                            <path
                                d="M100 100C121.811 121.811 155.851 155.851 155.851 155.851C155.851 155.851 179.625 179.625 194.858 194.858M225 100V125.709V182.447M350 100L295.035 154.965L255.142 194.858M350 225H324.291L267.553 225M350 350L295.035 295.035L255.142 255.142M225 350V322.518V267.553M100 350L155.851 294.149L194.858 255.142M100 225H127.482H182.447"
                                stroke="url(#paint0_linear_4_127)"
                                strokeWidth={2}
                            />
                            <defs>
                                <linearGradient
                                    id="paint0_linear_4_127"
                                    x1={100}
                                    y1={225}
                                    x2={350}
                                    y2={225}
                                    gradientUnits="userSpaceOnUse"
                                >
                                    <stop stopColor="#3D3D3D" stopOpacity={0} />
                                    <stop offset="0.498958" stopColor="#3D3D3D" stopOpacity="0.55" />
                                    <stop offset={1} stopColor="#3D3D3D" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                        </svg>
                    )}


                    <Button className="w-full" >
                        Resend Verification Email
                    </Button>

                </div>
            </main>
        </div>
    )
}