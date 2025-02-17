import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// get All interviews
export const getAllInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Error("Unauthorized");
    }

    // store all interviews
    const allinterviews = await ctx.db.query("interviews").collect();

    return allinterviews;
  },
});

// get a single interview
export const getMyInterviews = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Error("Unauthorized");
    }

    //
    const myinterviews = await ctx.db
      .query("interviews")
      .withIndex("by_candidate_id", (q) =>
        q.eq("candidateId", identity.subject)
      );

    return myinterviews;
  },
});

// create an interview
export const createInterview = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    candidateId: v.string(),
    status: v.string(),
    streamCallId: v.string(),
    interviewerIds: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Error("Unauthorized");
    }

    // Returns an unique id when new document is created
    const newID = await ctx.db.insert("interviews", {
      ...args,
    });
    return newID;
  },
});

// get interviews by streamid
export const getInterviewByStreamId = query({
  args: {
    streamCallId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Error("Unauthorized");
    }

    return await ctx.db
      .query("interviews")
      .withIndex("by_stream_call_id", (q) =>
        q.eq("streamCallId", args.streamCallId)
      )
      .first();
  },
});

// update status
export const updateInterviewStatus = mutation({
  args: {
    id: v.id("interviews"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return new Error("Unauthorized");
    }
    await ctx.db.patch(args.id, {
      status: args.status,
      ...(args.status === "completed" ? { endTime: Date.now() } : {}),
    });
  },
});
