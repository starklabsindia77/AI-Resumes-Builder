import Razorpay from "razorpay";

const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID;
const key_secret = process.env.RAZORPAY_KEY_SECRET;

if (!key_id || !key_id.startsWith("rzp_")) {
  console.warn("⚠️ Valid Razorpay Key ID is missing.");
}
if (!key_secret) {
  console.warn("⚠️ Razorpay Key Secret is missing.");
}

export const razorpay = new Razorpay({
  key_id: key_id || "placeholder",
  key_secret: key_secret || "placeholder",
});
