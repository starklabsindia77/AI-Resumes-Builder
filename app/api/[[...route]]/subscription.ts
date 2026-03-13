import { Hono } from "hono";
import { getAuthUser } from "@/lib/kinde";
import { getUserPlan } from "@/lib/entitlements";
import { db } from "@/db";
import { documentTable } from "@/db/schema";
import { eq, count } from "drizzle-orm";

const subscriptionRoute = new Hono()
  .get("/me", getAuthUser, async (c) => {
    try {
      const user = c.get("user");
      const userId = user.id;

      const plan = await getUserPlan(userId);
      
      const [result] = await db
        .select({ value: count() })
        .from(documentTable)
        .where(eq(documentTable.userId, userId));

      return c.json({
        success: true,
        data: {
          plan,
          resumeCount: result?.value || 0,
          maxResumes: plan === "free" ? 1 : 100, // Use a large finite number as JSON doesn't support Infinity
        },
      });
    } catch (error) {
      return c.json({ success: false, error }, 500);
    }
  });

export default subscriptionRoute;
