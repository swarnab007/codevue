"use client";
import Loader from "@/components/Loader";
import ScheduleInterview from "@/components/ScheduleInterview";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import React from "react";

const SchedulePage = () => {
  const router = useRouter();
  const { isInterviewer, isLoading } = useUserRole();

  // check if interviewer then show the schedule interview UI
  if (isLoading) return <Loader />;
  if (!isInterviewer) return router.push("/");
  return <ScheduleInterview />;
};

export default SchedulePage;
