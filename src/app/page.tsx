import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="m-5">
      <SignInButton>Log in</SignInButton>
    </div>
  );
}
