import React from "react";
import { Doc } from "../../convex/_generated/dataModel";
import { getMeetingStatus } from "@/lib/utils";
import useMeetingActions from "@/hooks/useMeetingActions";
import { format } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Calendar1 } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

type Interview = Doc<"interviews">;

const CardMeeting = ({ interview }: { interview: Interview }) => {
  // Get meeting status
  const status = getMeetingStatus(interview);
  const { joinMeeting } = useMeetingActions();
  // Format the Date and Time
  const formattedDate = format(
    new Date(interview.startTime),
    "EEEE MMMM d · h:mm a"
  );
  return (
    <Card>
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar1 className="h-4 w-4" />
            {formattedDate}
          </div>

          <Badge
            variant={
              status === "live"
                ? "default"
                : status === "completed"
                  ? "outline"
                  : "secondary"
            }
          >
            {status === "live"
              ? "Live Now"
              : status === "upcoming"
                ? "Upcoming"
                : "Completed"}
          </Badge>
        </div>

        <CardTitle>{interview.title}</CardTitle>
        {interview.description && (
          <CardDescription>{interview.description}</CardDescription>
        )}
      </CardHeader>

      <CardContent>
        {status === "live" && (
          <Button
            className="w-full"
            onClick={() => joinMeeting(interview.streamCallId)}
          >
            Join Meeting
          </Button>
        )}

        {status === "upcoming" && (
          <Button variant="outline" className="w-full" disabled>
            Waiting to Start
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default CardMeeting;
