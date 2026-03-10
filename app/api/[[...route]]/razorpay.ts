import { Hono } from "hono";
import { razorpay } from "@/lib/razorpay";
import { db } from "@/db";
import { userSubscriptionTable } from "@/db/schema/subscription";
import { eq } from "drizzle-orm";
import crypto from "crypto";

import { getAuthUser } from "@/lib/kinde";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const razorpayRoute = new Hono()
  .post(
    "/order",
    getAuthUser,
    zValidator("json", z.object({ amount: z.number() })),
    async (c) => {
      const user = c.get("user");
      const { amount } = c.req.valid("json");

      const options = {
        amount: amount * 100, // amount in the smallest currency unit (paise)
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
          userId: user.id,
        },
      };

      try {
        const order = await razorpay.orders.create(options);
        return c.json(order);
      } catch (error) {
        return c.json({ error: "Failed to create order" }, 500);
      }
    }
  )
  .post("/webhook", async (c) => {
    const signature = c.req.header("x-razorpay-signature");
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!signature || !secret) {
      return c.json({ message: "Invalid request" }, 400);
    }

    const body = await c.req.text();
    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== signature) {
      return c.json({ message: "Invalid signature" }, 400);
    }

    const payload = JSON.parse(body);
    const event = payload.event;

    // We specifically care about successful payments
    if (event === "order.paid" || event === "payment.captured") {
      const payment = payload.payload.payment.entity;
      const order_id = payment.order_id;
      const userId = payment.notes?.userId;

      if (userId) {
        // Update user subscription to professional
        await db
          .insert(userSubscriptionTable)
          .values({
            id: userId,
            plan: "pro",
            razorpayOrderId: order_id, // Store order id for tracking
          })
          .onConflictDoUpdate({
            target: userSubscriptionTable.id,
            set: {
              plan: "pro",
              razorpayOrderId: order_id,
              updatedAt: new Date(),
            },
          });
      }
    }

    return c.json({ success: true }, 200);
  });

export default razorpayRoute;
