import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export default async function RewardsPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  const rewards = await prisma.reward.findMany({
    where: { userId: payload.userId },
    orderBy: { createdAt: "desc" }
  });

  const total = rewards.reduce((sum, item) => sum + Number(item.amount), 0);

  return (
    <main className="page-shell">
      <div className="container">
        <h1 style={{ marginBottom: "1.5rem" }}>Rewards</h1>

        <div className="card" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
            <div>
              <div className="text-muted">Total rewards</div>
              <div style={{ fontSize: "2.3rem", fontWeight: 700, color: "#f4c95d" }}>${total.toFixed(2)}</div>
            </div>
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem" }}>
          {rewards.length === 0 ? (
            <p className="text-muted">No rewards yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward) => (
                  <tr key={reward.id}>
                    <td>${reward.amount.toString()}</td>
                    <td>{reward.status}</td>
                    <td>{reward.reason || "Task completion"}</td>
                    <td>{new Date(reward.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </main>
  );
}
