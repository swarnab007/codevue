import {
  CallControls,
  CallingState,
  CallParticipantsList,
  PaginatedGridLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { LoaderIcon, UsersIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "./ui/resizable";
import { Button } from "./ui/button";
import CodeEditor from "./CodeEditor";

const MeetingRoom = () => {
  const router = useRouter();
  // to hold and set the participants
  const [participants, setParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();

  // to check if joined or not
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) {
    return (
      <div className="h-96 flex items-center justify-center">
        <LoaderIcon className="size-6 animate-spin" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem-1px)]">
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={35}
          minSize={25}
          maxSize={100}
          className="relative"
        >
          {/* VIDEO LAYOUT */}
          <div className="absolute inset-0">
            <PaginatedGridLayout />
            {participants && (
              <div className="absolute right-0 top-0 h-full w-[300px] bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <CallParticipantsList onClose={() => setParticipants(false)} />
              </div>
            )}
          </div>

          {/* VIDEO CONTROLS */}

          <div className="absolute bottom-4 left-0 right-0">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-2 flex-wrap justify-center px-4">
                <CallControls onLeave={() => router.push("/")} />

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="size-10"
                    onClick={() => setParticipants(!participants)}
                  >
                    <UsersIcon className="size-4" />
                  </Button>

                </div>
              </div>
            </div>
          </div>
        </ResizablePanel>

        <ResizableHandle withHandle/>
        <ResizablePanel defaultSize={65} minSize={25}>
            <CodeEditor />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default MeetingRoom;
