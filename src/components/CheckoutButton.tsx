"use client";

import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
);

interface CheckoutButtonProps {
  items: { name: string; price: number; quantity: number }[];
}

export default function CheckoutButton({ items }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    const stripe = await stripePromise;

    if (!stripe) {
      console.error("Stripe failed to load.");
      setLoading(false);
      return;
    }

    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items }),
    });

    const session = await response.json();

    if (session.id) {
      await stripe.redirectToCheckout({ sessionId: session.id });
    } else {
      console.error("Failed to initiate checkout.");
    }
    setLoading(false);
  };

  return (
    <button onClick={handleCheckout} disabled={loading}>
      {loading ? "Processing..." : "Checkout"}
    </button>
  );
}
