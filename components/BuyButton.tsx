"use client";

export default function BuyButton() {
  async function handleClick() {
    const res = await fetch("/api/checkout", { method: "POST" });
    const data = await res.json();
    window.location.href = data.url; // go to Stripe Checkout
  }

  return (
    <button
      onClick={handleClick}
      style={{
        marginTop: 16,
        padding: "12px 18px",
        borderRadius: 8,
        border: "1px solid #ddd",
        fontWeight: 600,
        cursor: "pointer",
      }}
    >
      Buy BR-1011 — $219
    </button>
  );
}
