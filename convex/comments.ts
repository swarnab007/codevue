import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// get All comments of an interview
export const getAllComments = query({
  args: {
    interviewId: v.id("interviews"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_interview_id", (q) =>
        q.eq("interviewId", args.interviewId)
      ).collect();

    return comments;
  },
});

// Add a comment
export const addComment = mutation({
  args: {
    content: v.string(),
    rating: v.number(),
    interviewId: v.id("interviews"),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthorized");

    const commentIds = await ctx.db.insert("comments", {
      content: args.content,
      rating: args.rating,
      interviewId: args.interviewId,
      interviewerId: identity.subject,
    });

    return commentIds;
  },
});
