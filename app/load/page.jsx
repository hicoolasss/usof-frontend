import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {

    return (
        <div className="realtive w-screen h-screen bg-backgorund flex flex-col items-center justify-start" >
            <div className="absolute top-5 left-5 w-1/6 h-10 animate-pulse bg-zinc-300 rounded-md"> </div>
            <div className="w-full h-2/3 items-start justify-center flex flex-col space-y-5 p-5 lg:flex-row lg:space-x-5 lg:space-y-0 mt-16">
                <Card className="space-y-4 bg-zinc-950 w-1/6 h-2/5 animate-pulse"> </Card>
                <Card className="space-y-4 bg-zinc-950 w-1/4 h-2/5 animate-pulse"> </Card>
                <Card className="space-y-4 bg-zinc-950 w-1/6 h-2/5 animate-pulse"> </Card>
            </div>
        </div>
    )
}