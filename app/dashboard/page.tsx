import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";
import Link from "next/link";

export default async function DashboardPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
    include: { wallet: true }
  });

  if (!user) redirect("/login");

  const recentTransactions = await prisma.transaction.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 5
  });

  const rewardSummary = await prisma.reward.aggregate({
    where: { userId: user.id },
    _sum: { amount: true }
  });

  return (
    <main className="page-shell">
      <div className="container">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap", marginBottom: "2rem" }}>
          <div>
            <p style={{ color: "#f4c95d", letterSpacing: "0.14em", textTransform: "uppercase", fontWeight: 700, margin: 0 }}>
              dashboard
            </p>
            <h1 style={{ margin: "0.5rem 0 0" }}>Welcome, {user.fullName || user.username || "User"}</h1>
          </div>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/profile" className="btn btn-secondary">Profile</Link>
            <Link href="/tasks" className="btn btn-secondary">Tasks</Link>
            <Link href="/payments" className="btn btn-primary">Payments</Link>
            <form action="/api/auth/logout" method="POST">
              <button className="btn btn-secondary" type="submit">Logout</button>
            </form>
          </div>
        </div>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="text-muted">Available balance</div>
            <div style={{ fontSize: "2rem", fontWeight: 700, marginTop: "0.5rem" }}>
              ${user.wallet?.availableBalance.toString() || "0.00"}
            </div>
          </div>

          <div className="stat-card">
            <div className="text-muted">Pending</div>
            <div style={{ fontSize: "2rem", fontWeight: 700, marginTop: "0.5rem" }}>
              ${user.wallet?.pendingBalance.toString() || "0.00"}
            </div>
          </div>

          <div className="stat-card">
            <div className="text-muted">Rewards earned</div>
            <div style={{ fontSize: "2rem", fontWeight: 700, marginTop: "0.5rem" }}>
              ${rewardSummary._sum.amount?.toString() || "0.00"}
            </div>
          </div>

          <div className="stat-card">
            <div className="text-muted">Verification</div>
            <div style={{ fontSize: "1.7rem", fontWeight: 700, marginTop: "0.5rem", color: user.isKycVerified ? "#33d18b" : "#f4c95d" }}>
              {user.isKycVerified ? "Verified" : "Pending"}
            </div>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.1fr 0.9fr", gap: "1.5rem", marginTop: "2rem" }}>
          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>Recent Activity</h3>
            {recentTransactions.length === 0 ? (
              <p className="text-muted">No transactions yet.</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Amount</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentTransactions.map((tx) => (
                    <tr key={tx.id}>
                      <td>{tx.type}</td>
                      <td>${tx.amount.toString()}</td>
                      <td>{tx.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          <div className="card" style={{ padding: "1.5rem" }}>
            <h3 style={{ marginTop: 0 }}>Quick Links</h3>
            <div className="grid">
              <Link href="/tasks" className="btn btn-secondary">View tasks</Link>
              <Link href="/rewards" className="btn btn-secondary">Rewards</Link>
              <Link href="/transactions" className="btn btn-secondary">Transactions</Link>
              <Link href="/support" className="btn btn-secondary">Support</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
