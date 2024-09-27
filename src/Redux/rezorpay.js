import Razorpay from "razorpay";

export const instance = new Razorpay({
  key_id: import.meta.env.VITE_KEY_ID,
  key_secret: import.meta.env.VITE_KEY_SECRET,
});

instance.orders.all().then(console.log).catch(console.error);
