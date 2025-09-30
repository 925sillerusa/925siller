import Stripe from "stripe";

export const runtime = "nodejs"; // needed to read the raw body

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
    }

    return new Response("ok", { status: 200 });
  } catch (e: any) {
    console.error("Webhook verify failed:", e.message);
    return new Response(`Webhook Error: ${e.message}`, { status: 400 });
  }
}
