import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@clerk/nextjs/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export async function POST(request: Request) {
  try {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      console.error("STRIPE_SECRET_KEY is not set");
      return NextResponse.json(
        { error: "Server configuration error: Stripe is not configured." },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const { userId } = await auth();
    const body = await request.json();
    const projectType = typeof body.projectType === "string" ? body.projectType : "Project";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Project Kickoff Deposit",
            },
            unit_amount: 50000,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: userId ?? "",
        projectType,
      },
      success_url: `${BASE_URL}/dashboard?payment=success`,
      cancel_url: `${BASE_URL}/dashboard/proposal`,
    });

    return NextResponse.json({
      sessionId: session.id,
      url: session.url,
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Checkout failed" },
      { status: 500 }
    );
  }
}
