import Stripe from "stripe";

export const runtime = "nodejs"; // required to read the raw body

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  });

  const signature = req.headers.get("stripe-signature") as string;
  const rawBody = await req.text();

  try {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log("✅ Payment complete. Session:", session.id);
      // (We’ll wire email/SMS after we confirm this works.)
    }

    return new Response("ok", { status: 200 });
  } catch (err: any) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }
}
