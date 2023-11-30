import { Skeleton } from "./ui/skeleton"
import {  CardHeader, CardContent, Card } from "@/components/ui/card"
export default function PostsCardSkeleton() {
    return [...Array(5)].map((_, index) => (
        <div key={index} className="space-y-4 bg-secondary_background_color rounded-lg p-5 relative ">
            <Skeleton className="w-1/2 h-8 " />
            <Skeleton className="w-12 h-5 bg-highlight" />
            <div className="shrink-0 bg-border h-[1px] w-full " />
            <div className="flex items-center justify-between">
                <div className="space-x-2 flex flex-row items-center">
                    <Skeleton className="rounded-full w-10 h-10">

                    </Skeleton>
                    <Skeleton className="w-16 h-8" />
                </div>
                <div className="flex space-x-2 items-center">

                    <Skeleton className="w-24 h-5" />
                    <div className="flex flex-col space-y-1">
                        <Skeleton className="w-16 h-5" />
                        <Skeleton className="w-20 h-5" />
                    </div>
                </div>
            </div>
        </div>
    ));
}