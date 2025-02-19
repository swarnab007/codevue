"use client";
import { ReactNode, useEffect, useState } from "react";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useUser } from "@clerk/nextjs";
import Loader from "../Loader";
import { streamTokenProvider } from "@/actions/stream.actions";

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [streamClient, setStreamClient] = useState<StreamVideoClient | null>(
    null
  );
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const client = new StreamVideoClient({
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
      user: {
        id: user.id,
        name: `${user.firstName} ${user.lastName}` || user.id,
        image: user.imageUrl,
      },
      tokenProvider: streamTokenProvider
    });

    setStreamClient(client);
  }, [user, isLoaded]);

  if (!streamClient) return <Loader />;

  return <StreamVideo client={streamClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
