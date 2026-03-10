import { pgTable, text, timestamp, varchar, integer } from "drizzle-orm/pg-core";

export const userSubscriptionTable = pgTable("user_subscription", {
  id: text("id").primaryKey(), // Kinde User ID
  plan: text("plan", { enum: ["free", "pro", "enterprise"] }).notNull().default("free"),
  razorpaySubscriptionId: text("razorpay_subscription_id"),
  razorpayCustomerId: text("razorpay_customer_id"),
  razorpayOrderId: text("razorpay_order_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
