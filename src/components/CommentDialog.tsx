import React, { useState } from "react";
import { Id } from "../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import toast from "react-hot-toast";
import { MessageSquareIcon, StarIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { getInterviewerInfo } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { format } from "date-fns";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

const CommentDialog = ({ interviewId }: { interviewId: Id<"interviews"> }) => {
  // Toggle for Dialog
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("3");

  // Fetch all users
  const users = useQuery(api.users.getUsers);

  // add comment
  const addComment = useMutation(api.comments.addComment);
  // get existing comments
  const getExistingComments = useQuery(api.comments.getAllComments, {
    interviewId,
  });

  // Function to add comment
  const handleSubmit = async () => {
    if (!comment.trim()) return toast.error("Plase add comment");
    try {
      await addComment({
        content: comment.trim(),
        interviewId,
        rating: parseInt(rating),
      });
      setComment("");
      setRating("3");
      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("Can not add comment");
    }
  };

  // Rating
  const giveRating = (ratingNo: number) => {
    return (
      <div className="flex gap-0.5">
        {[1, 2, 3, 4, 5].map((val) => (
          <StarIcon
            key={val}
            className={
              val <= ratingNo
                ? "h-4 w-4 fill-primary text-primary"
                : "h-4 w-4 text-muted-foreground"
            }
          />
        ))}
      </div>
    );
  };

  if (getExistingComments === undefined || users === undefined) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* DIALOG TRIGGER */}
      <DialogTrigger asChild>
        <Button variant="secondary" className="w-full">
          <MessageSquareIcon className="h-4 w-4 mr-2" />
          Add Comment
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Leave a Comment</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {getExistingComments.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Previous Comments</h4>
                <Badge variant="outline">
                  {getExistingComments.length} Comment
                  {getExistingComments.length !== 1 ? "s" : ""}
                </Badge>
              </div>

              {/* DISPLAY EXISTING COMMENTS */}

              <ScrollArea className="h-[240px]">
                <div className="space-y-4">
                  {getExistingComments.map((comment, index) => {
                    const interviewer = getInterviewerInfo(
                      users,
                      comment.interviewerId
                    );
                    return (
                      <div
                        key={index}
                        className="rounded-lg border p-4 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={interviewer.image} />
                              <AvatarFallback>
                                {interviewer.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="text-sm font-medium">
                                {interviewer.name}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {format(
                                  comment._creationTime,
                                  "MMM d, yyyy • h:mm a"
                                )}
                              </p>
                            </div>
                          </div>
                          {giveRating(comment.rating)}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {comment.content}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          <div className="space-y-4">
            {/* REATING */}
            <div className="space-y-2">
              <Label>Rating</Label>
              <Select value={rating} onValueChange={setRating}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Rating" />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <SelectItem key={value} value={value.toString()}>
                      <div className="flex items-center gap-2">
                        {giveRating(value)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* COMMENT */}
            <div className="space-y-2">
              <Label>Your Comment</Label>
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Please Share Your Detailed View about Candidate ... "
                className="h-32"
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <Button variant="outline" onClick={() => setOpen(false)}>
          cancel
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogContent>
    </Dialog>
  );
};

export default CommentDialog;
