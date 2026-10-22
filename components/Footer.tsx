import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "2rem 0", color: "#a9bfd4" }}>
      <div className="container" style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
        <div>
          <strong className="text-gold">PrimeTrade</strong>
        </div>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
          <Link href="/legal/terms">Terms</Link>
          <Link href="/legal/privacy">Privacy</Link>
          <Link href="/legal/cookie-policy">Cookies</Link>
          <Link href="/legal/refund-policy">Refunds</Link>
          <Link href="/legal/rewards-policy">Rewards</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
