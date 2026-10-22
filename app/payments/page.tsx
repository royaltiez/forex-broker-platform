import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";
import Link from "next/link";

export default async function PaymentsPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  return (
    <main className="page-shell">
      <div className="container">
        <h1 style={{ marginBottom: "1.5rem" }}>Payment Center</h1>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem" }}>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>Deposit</h3>

            <form action="/api/payments/create-checkout" method="POST">
              <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Amount (USD)</label>
              <input className="input" type="number" name="amount" min="10" step="0.01" defaultValue="50" />
              <button type="submit" className="btn btn-primary mt-4" style={{ width: "100%" }}>Pay with Stripe</button>
            </form>
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>Withdrawal</h3>
            <p className="text-muted">Withdrawal requests are reviewed by admin and only processed according to your legal and payment-provider rules.</p>
            <Link href="/transactions" className="btn btn-secondary">View Transaction History</Link>
          </div>
        </div>
      </div>
    </main>
  );
}
