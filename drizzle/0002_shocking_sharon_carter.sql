CREATE TABLE "user_subscription" (
	"id" text PRIMARY KEY NOT NULL,
	"plan" text DEFAULT 'free' NOT NULL,
	"razorpay_subscription_id" text,
	"razorpay_customer_id" text,
	"razorpay_order_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "document" ADD COLUMN "template" varchar(50) DEFAULT 'classic' NOT NULL;