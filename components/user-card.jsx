import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
export default function UserCard() {




    return (
    <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-9 w-9">
                <AvatarImage alt="@user1" src="/placeholder-avatar.jpg" />
                <AvatarFallback>U1</AvatarFallback>
            </Avatar>
            <div className="grid gap-1">
                <CardTitle>User 1</CardTitle>
                <CardDescription>user1@example.com</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="grid gap-2">
            <div className="text-sm font-semibold">Role: Administrator</div>
            <div className="flex items-center gap-4 text-sm">
                <Badge >Rating: 4.7</Badge>
            </div>
        </CardContent>
    </Card>
    )
}
