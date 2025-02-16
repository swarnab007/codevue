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
});