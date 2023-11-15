import { CardTitle, CardHeader, CardContent, Card } from "@/components/ui/card"

export default function Component() {

    return (
        <div className="realtive w-screen h-screen bg-backgorund flex flex-col items-center justify-start">
            <div className="absolute top-5 left-5 w-64 h-10 bg-zinc-300 rounded-md "> </div>
            <div className="w-full h-full items-center justify-center flex flex-col space-y-5 p-8 mt-16 lg:items-start lg:flex-row lg:space-y-0 lg:space-x-5">
                <Card className="space-y-4 bg-zinc-950 w-80 h-80 animate-pulse"> </Card>
                <Card className="space-y-4 bg-zinc-950 w-80 h-80 animate-pulse"> </Card>
                <Card className="space-y-4 bg-zinc-950 w-80 h-80 animate-pulse"> </Card>
            </div>
        </div>
    )
}