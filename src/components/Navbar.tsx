import { Code } from "lucide-react";
import { SignedIn, UserButton } from "@clerk/clerk-react";
import DashboardBtn from "./DashboardBtn";
import { ToggleMode } from "./ToggleMode";

const Navbar = () => {
  return (
    <div className="px-6 mx-4">
      <header className="border-b border-border/10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-semibold text-indigo-400">
              Codevue
            </span>
          </div>
          <div className="flex items-center gap-4">
            {" "}
            {/* Increased gap for better spacing */}
            <SignedIn>
              <DashboardBtn />
              <ToggleMode />
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
