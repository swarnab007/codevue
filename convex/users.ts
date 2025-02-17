import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const syncUser = mutation({
    args: {
      name: v.string(),
      email: v.string(),
      clerkId: v.string(),
      image: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
      const existingUser = await ctx.db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), args.clerkId))
        .first();
  
      if (existingUser) return;
  
      return await ctx.db.insert("users", {
        ...args,
        role: "candidate",
      });
    },
  });

export const getUsersbyClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

      return user;
  },
});
