"use client";
import Link from "next/link";
import { SparklesIcon, Code, Menu, Bot } from "lucide-react"; // Added Menu icon for mobile
import { Button } from "./ui/button";
import { useUserRole } from "@/hooks/useUserRole";
import { useState } from "react"; // Added useState for mobile menu toggle
import { ToggleMode } from "./ToggleMode";
import { UserButton, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/nextjs";

const DashboardBtn = () => {
  const { isLoading, isCandidate } = useUserRole();

  if (isCandidate || isLoading) return null;

  return (
    <div>
      <Link href="/dashboard" passHref>
        <Button className="gap-2 font-medium" size="sm">
          <SparklesIcon className="size-4" />
          Dashboard
        </Button>
      </Link>
    </div>
  );
};

const MockInterviewBtn = () => {
  const { isLoading, isCandidate } = useUserRole();

  // Only show the button if the user is a candidate
  if (!isCandidate || isLoading) return null;

  return (
    <div>
      <Link href="/mock-interview" passHref>
        <Button className="gap-2 font-medium" size="sm">
          <Bot className="size-4" />
          Take a Mock Interview
        </Button>
      </Link>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage mobile menu

  return (
    <div className="px-6 mx-4">
      <header className="border-b border-border/10">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <Code className="w-6 h-6 text-indigo-400" />
            <span className="text-xl font-semibold text-indigo-400">
              codevue
            </span>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            <SignedIn>
              <DashboardBtn />
              <MockInterviewBtn />
              <ToggleMode />
              <UserButton />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-16 right-0 bg-background w-full border-b border-border/10">
              <div className="flex flex-col items-center gap-4 p-4">
                <SignedIn>
                  <DashboardBtn />
                  <ToggleMode />
                  <UserButton />
                </SignedIn>
                <SignedOut>
                  <RedirectToSignIn />
                </SignedOut>
              </div>
            </div>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navbar;