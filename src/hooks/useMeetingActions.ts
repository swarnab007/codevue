import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { log } from "node:console";
import toast from "react-hot-toast";

const useMeetingActions = () => {
  const router = useRouter();
  const client = useStreamVideoClient();

  const createInstantMeeting = async () => {
    if (!client) return;

    try {
      const id = crypto.randomUUID();
      const call = await client.call("default", id);

      await call.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
          custom: {
            description: "instant meeting",
          },
        },
      });

      router.push(`/meeting/${call.id}`);
      toast.success("Meeting created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to Create Meeting");
    }
  };

  const joinMeeting = async (callid: string) => {
    if (!client) return toast.error("Failed to Join meeting");
    router.push(`/meeting/${callid}`);
  };

  return { createInstantMeeting, joinMeeting };
};

export default useMeetingActions;
