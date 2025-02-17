import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
console.log("Schema file loaded!");

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()), // Optional field for the user's image
    role: v.union(v.literal("candidate"), v.literal("interviewer")), // Role can be either "candidate" or "interviewer"
    clerkId: v.string(), // Clerk ID for authentication
  }).index("by_clerk_id", ["clerkId"]), // Index on the `clerkId` field

  // interview table
  interviews: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    candidateId: v.string(),
    status: v.string(),
    streamCallId: v.string(),
    interviewerIds: v.array(v.string()),
  })
    .index("by_candidate_id", ["candidateId"])
    .index("by_stream_call_id", ["streamCallId"]),

  // comments table
  comments: defineTable({
    content: v.string(),
    rating: v.number(),
    interviewerId: v.string(),
    interviewId: v.id("interviews"),
  }).index("by_interview_id", ["interviewId"]),
});
