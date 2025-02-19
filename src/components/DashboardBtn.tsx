"use client";
import Link from "next/link";
import { SparklesIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useUserRole } from "@/hooks/useUserRole";

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

export default DashboardBtn;
