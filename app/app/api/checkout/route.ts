import Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2024-06-20",
  });

  const { origin } = new URL(req.url);

  // Test item BR-1011 — $219
  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/?success=1`,
    cancel_url: `${origin}/?canceled=1`,
    automatic_tax: { enabled: true },
    shipping_address_collection: { allowed_countries: ["US", "CA"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: "usd" },
          display_name: "USPS Standard (5–8 business days)",
          delivery_estimate: {
            minimum: { unit: "business_day", value: 5 },
            maximum: { unit: "business_day", value: 8 },
          },
        },
      },
    ],
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: 21900, // $219.00
          product_data: { name: "BR-1011 Bracelet" },
        },
      },
    ],
  });

  return Response.json({ url: session.url });
}
