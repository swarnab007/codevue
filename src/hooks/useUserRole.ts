import { useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { useQuery } from "convex/react";

export const useUserRole = () => {
  const { user } = useUser();

  // Getuser Data from convex
  const userData = useQuery(api.users.getUsersbyClerkId, {
    clerkId: user?.id || "",
  })

  const isLoading = userData === undefined;

  return {
    isLoading,
    isCandidate: userData?.role === "candidate",
    isInterviewer: userData?.role === "interviewer"
  }
};

