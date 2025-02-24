import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useMutation, useQuery } from "convex/react";
import React, { useState } from "react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import UserInfo from "./UserInfo";
import { Loader2Icon, XIcon } from "lucide-react";
import { TIME_SLOTS } from "@/constants";
import { Calendar } from "./ui/calendar";
import CardMeeting from "./CardMeeting";

const ScheduleInterview = () => {
  // get current user
  const { user } = useUser();
  const client = useStreamVideoClient();
  // state for toggling dialog
  const [open, setOpen] = useState(false);
  // state for Loading state
  const [creating, setCreating] = useState(false);

  const users = useQuery(api.users.getUsers) ?? [];
  const interviews = useQuery(api.interviews.getAllInterviews) ?? [];
  const createinterview = useMutation(api.interviews.createInterview);

  // Fetch all candidates and interviewers
  const candidates = users?.filter((u) => u.role === "candidate");
  const interviewers = users?.filter((u) => u.role === "interviewer");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: new Date(),
    time: "10:00",
    candidateId: "",
    interviewerIds: user?.id ? [user.id] : [],
  });

  const scheduleMeeting = async () => {
    if (!client || !user) return;

    if (!formData.candidateId || formData.interviewerIds.length === 0) {
      toast.error("Select At least one candidate and interviewer");
      return;
    }

    setCreating(true);
    try {
      const { title, description, date, time, candidateId, interviewerIds } =
        formData;
      const [hours, minutes] = time.split(":");
      const meetDate = new Date(date);
      meetDate.setHours(parseInt(hours), parseInt(minutes), 0);

      // Create a unique ID for the meeting
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      // Create the meeting
      await call.getOrCreate({
        data: {
          starts_at: meetDate.toISOString(),
          custom: {
            description: title,
            additionalDetails: description,
          },
        },
      });

      // Save the meeting to the database
      await createinterview({
        title,
        description,
        startTime: meetDate.getTime(),
        status: "upcoming",
        candidateId,
        interviewerIds,
        streamCallId: id,
      });

      // Find the candidate's details
      const candidate = candidates.find(
        (c) => c.clerkId === formData.candidateId
      );
      if (!candidate) {
        throw new Error("Candidate not found");
      }

      // Generate the meeting link
      const meetingLink = `http://localhost:3000/meeting/${id}`; // Replace with your actual meeting URL

      // Send email to the candidate using Mailjet
      await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: candidate.email,
          name: candidate.name,
          date: meetDate.toLocaleString(),
          title: title,
          description: description,
          meetingLink: meetingLink,
        }),
      });

      setOpen(false);
      toast.success("Meeting scheduled successfully");

      // Reset form data
      setFormData({
        title: "",
        description: "",
        date: new Date(),
        time: "10:00",
        candidateId: "",
        interviewerIds: user?.id ? [user.id] : [],
      });
    } catch (error) {
      console.log("Error while creating schedule", error);
      toast.error("Failed to schedule meeting. Please try again");
    } finally {
      setCreating(false);
    }
  };

  // Add interviewer
  const addInterviewer = (interviewerId: string) => {
    if (!formData.interviewerIds.includes(interviewerId)) {
      setFormData((prev) => ({
        ...prev,
        interviewerIds: [...prev.interviewerIds, interviewerId],
      }));
    }
  };

  // Remove interviewer
  const removeInterviewer = (interviewerId: string) => {
    if (interviewerId === user?.id) return;
    setFormData((prev) => ({
      ...prev,
      interviewerIds: prev.interviewerIds.filter((id) => id !== interviewerId),
    }));
  };

  const selectedInterviewers = interviewers.filter((i) =>
    formData.interviewerIds.includes(i.clerkId)
  );

  const availableInterviewers = interviewers.filter(
    (i) => !formData.interviewerIds.includes(i.clerkId)
  );

  return (
    <div className="container max-w-7xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between">
        {/* HEADER INFO */}
        <div>
          <h1 className="text-3xl font-bold">Interviews</h1>
          <p className="text-muted-foreground mt-1">
            Schedule and manage interviews
          </p>
        </div>

        {/* DIALOG */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button size="lg">Schedule Interview</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Create an interview</DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {/* INTERVIEW TITLE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Title</label>
                <Input
                  value={formData.title}
                  placeholder="Interview title"
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full"
                />
              </div>

              {/* INTERVIEW DESC */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  placeholder="Interview description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                  className="w-full"
                />
              </div>

              {/* CANDIDATE */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Candidate</label>
                <Select
                  value={formData.candidateId}
                  onValueChange={(candidateId) =>
                    setFormData({ ...formData, candidateId })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select candidate" />
                  </SelectTrigger>
                  <SelectContent>
                    {candidates.map((candidate) => (
                      <SelectItem
                        key={candidate.clerkId}
                        value={candidate.clerkId}
                      >
                        <UserInfo user={candidate} />
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* INTERVIEWERS */}
              <div className="space-y-2">
                <label className="text-sm font-medium">Interviewers</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedInterviewers.map((interviewer) => (
                    <div
                      key={interviewer.clerkId}
                      className="inline-flex items-center gap-2 bg-secondary px-2 py-1 rounded-md text-sm"
                    >
                      <UserInfo user={interviewer} />
                      {interviewer.clerkId !== user?.id && (
                        <button
                          onClick={() => removeInterviewer(interviewer.clerkId)}
                          className="hover:text-destructive transition-colors"
                        >
                          <XIcon className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                {availableInterviewers.length > 0 && (
                  <Select onValueChange={addInterviewer}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Add interviewer" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableInterviewers.map((interviewer) => (
                        <SelectItem
                          key={interviewer.clerkId}
                          value={interviewer.clerkId}
                        >
                          <UserInfo user={interviewer} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              {/* DATE & TIME */}
              <div className="flex flex-col md:flex-row gap-4">
                {/* CALENDAR */}
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">Date</label>
                  <Calendar
                    mode="single"
                    selected={formData.date}
                    onSelect={(date) =>
                      date && setFormData({ ...formData, date })
                    }
                    disabled={(date) => date < new Date()}
                    className="rounded-md border w-full"
                  />
                </div>

                {/* TIME */}
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-medium">Time</label>
                  <Select
                    value={formData.time}
                    onValueChange={(time) => setFormData({ ...formData, time })}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select time" />
                    </SelectTrigger>
                    <SelectContent>
                      {TIME_SLOTS.map((time) => (
                        <SelectItem key={time} value={time}>
                          {time}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col md:flex-row justify-end gap-3 pt-4">
                <Button
                  variant="outline"
                  onClick={() => setOpen(false)}
                  className="w-full md:w-auto"
                >
                  Cancel
                </Button>
                <Button
                  onClick={scheduleMeeting}
                  disabled={creating}
                  className="w-full md:w-auto"
                >
                  {creating ? (
                    <>
                      <Loader2Icon className="mr-2 size-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    "Schedule interview"
                  )}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* MEETING CARD ND LOADING STATE */}
      {!interviews ? (
        <Loader2Icon className="size-8 animate-spin text-muted-foreground" />
      ) : interviewers.length > 0 ? (
        <div className="space-y-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {interviews.map((interview) => (
              <CardMeeting key={interview._id} interview={interview} />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          No interviews scheduled Yet
        </div>
      )}
    </div>
  );
};

export default ScheduleInterview;
