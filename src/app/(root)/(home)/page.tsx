"use client";

import { useUserRole } from "@/hooks/useUserRole";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { QUICK_ACTIONS } from "@/constants";
import CardAction from "@/components/CardAction";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ModalMeeting from "@/components/ModalMeeting";
import { Loader2Icon } from "lucide-react";
import CardMeeting from "@/components/CardMeeting";

export default function Home() {
  const router = useRouter();

  const { isInterviewer } = useUserRole();
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"start" | "join">();
  // All of candidate interviews
  const myInterviews = useQuery(api.interviews.getMyInterviews);

  const handleAction = (title: string) => {
    switch (title) {
      case "New Call":
        setModalType("start");
        setShowModal(true);
        break;
      case "Join Interview":
        setModalType("join");
        setShowModal(true);
        break;
      default:
        router.push(`${title.toLowerCase()}`);
    }
  };

  return (
    <>
      <main className="container py-8">
        <div className="max-w-[980px] mx-auto">
          <div className="mb-8">
            <div className="border border-gray-700 rounded-lg p-10 bg-black/30">
              <h1 className="text-4xl font-bold text-indigo-400">
                Welcome back!
              </h1>
              <p className="text-muted-foreground text-lg mt-8">
                {isInterviewer
                  ? "Manage your interviews and review candidates effectively"
                  : "Access your upcoming interviews and preparations"}
              </p>
            </div>
          </div>
          {isInterviewer ? (
            <>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {QUICK_ACTIONS.map((action) => (
                  <CardAction
                    key={action.title}
                    action={action}
                    onClick={() => handleAction(action.title)}
                  />
                ))}
              </div>

              <ModalMeeting
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={modalType === "join" ? "Join Meeting" : "Create Meeting"}
                isJoiningMeeting={modalType === "join"}
              />
            </>
          ) : (
            ""
          )}
        </div>

        <div className="mt-8">
          {myInterviews === undefined ? (
            <div className="flex justify-center py-12">
              <Loader2Icon className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : myInterviews.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {myInterviews.map((interview) => (
                <CardMeeting key={interview._id} interview={interview} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              You have no scheduled interviews at the moment
            </div>
          )}
        </div>
      </main>
    </>
  );
}
