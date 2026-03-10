import { db } from "@/db";
import { userSubscriptionTable, documentTable } from "@/db/schema";
import { eq, and, count } from "drizzle-orm";

export type Plan = "free" | "pro" | "enterprise";

export async function getUserPlan(userId: string): Promise<Plan> {
  const [sub] = await db
    .select()
    .from(userSubscriptionTable)
    .where(eq(userSubscriptionTable.id, userId))
    .limit(1);

  return (sub?.plan as Plan) || "free";
}

export async function canCreateResume(userId: string): Promise<boolean> {
  const plan = await getUserPlan(userId);
  
  if (plan === "pro" || plan === "enterprise") {
    return true;
  }

  // Starter (free) plan logic: max 1 resume
  const [result] = await db
    .select({ value: count() })
    .from(documentTable)
    .where(eq(documentTable.userId, userId));

  return (result?.value || 0) < 1;
}

export async function hasPremiumAccess(userId: string): Promise<boolean> {
  const plan = await getUserPlan(userId);
  return plan === "pro" || plan === "enterprise";
}
