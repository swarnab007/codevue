import { UserCircleIcon } from "lucide-react";
import { Doc } from "../../convex/_generated/dataModel";
import { AvatarImage, Avatar, AvatarFallback } from "./ui/avatar";

type User = Doc<"users">;

function UserInfo({ user }: { user: User }) {
  console.log(user);
  
  return (
    <div className="flex items-center gap-2">
      <Avatar className="size-6">
        <AvatarImage src={user?.image} />
        <AvatarFallback>
          <UserCircleIcon className="size-4" />
        </AvatarFallback>
      </Avatar>
      <span>{user.name}</span>
    </div>
  );
}

export default UserInfo;
