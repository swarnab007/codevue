import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

const useGetCallById = (id: string | string[]) => {
  // state which hold current call
  const [call, setCall] = useState<Call>();
  const [isCallLoading, setIsCallLoading] = useState(true);

  // Get the client
  const client = useStreamVideoClient();

  // These will change as change in client and id
  useEffect(() => {
    if (!client) return;

    const loadCall = async () => {
      try {
        // Get calls based on ID
        const { calls } = await client.queryCalls({
          filter_conditions: { id },
        });
        if(calls.length > 0) setCall(calls[0]);
        setIsCallLoading(false);
      } catch (error) {
        console.log(error);
        setCall(undefined);
        setIsCallLoading(false);
      }
    };

    loadCall();
  }, [client, id]);

  return {call, isCallLoading}
};

export default useGetCallById;
