"use client"

import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import Loader from "@/components/Loader";
import MeetingSetup from "@/components/MeetingSetup";
import MeetingRoom from "@/components/MeetingRoom";
import useGetCallById from "@/hooks/useGetCallById";

const MeetingPage = () => {
  // get ID of Meeting
  const {id} = useParams();
  const {isLoaded} = useUser();
  // state for deciding to show either meeting setup is completed or not
  const [isSetupComplete, setIsSetupComplete] = useState();
  // custom hook which will give us current call and isCallLoading
  const {call, isCallLoading} = useGetCallById(id || "");

  if(isCallLoading || !isLoaded) return <Loader />

  // if there is no call exists
  if(!call) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-2xl font-semibold">Meeting not found</p>
      </div>
    )
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        {!isSetupComplete ? <MeetingSetup /> : <MeetingRoom />}
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
