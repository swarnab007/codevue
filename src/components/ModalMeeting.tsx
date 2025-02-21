import { Dialog, DialogTitle } from "@radix-ui/react-dialog";
import React, { useState } from "react";
import { DialogContent, DialogHeader } from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import useMeetingActions from "@/hooks/useMeetingActions";

interface ModalMeetingProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  isJoiningMeeting: boolean;
}

const ModalMeeting = ({
  isOpen,
  onClose,
  title,
  isJoiningMeeting,
}: ModalMeetingProps) => {
  const [meetLink, setMeetLink] = useState("");
  const { joinMeeting, createInstantMeeting } = useMeetingActions();

  const handleSubmit = () => {
    if (isJoiningMeeting) {
      const meetingID = meetLink.split("/").pop();
      if (meetingID) joinMeeting(meetingID);
    } else {
      createInstantMeeting();
    }

    setMeetLink("");
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-4">
          {isJoiningMeeting && (
            <Input
              placeholder="Put Meeting Link Here ..."
              value={meetLink}
              onChange={(e) => setMeetLink(e.target.value)}
            />
          )}

          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={onClose}>
              cancel
            </Button>
            <Button onClick={handleSubmit}>
              {isJoiningMeeting ? "Join Meeting" : "Start Meeting"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ModalMeeting;
