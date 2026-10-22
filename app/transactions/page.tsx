import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export default async function TransactionsPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  const transactions = await prisma.transaction.findMany({
    where: { userId: payload.userId },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="page-shell">
      <div className="container">
        <h1 style={{ marginBottom: "1.5rem" }}>Transaction History</h1>

        <div className="card" style={{ padding: "1.5rem" }}>
          {transactions.length === 0 ? (
            <p className="text-muted">No transactions yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Reference</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.type}</td>
                    <td>${tx.amount.toString()}</td>
                    <td>{tx.status}</td>
                    <td>{tx.referenceId || "—"}</td>
                    <td>{new Date(tx.createdAt).toLocaleDateString()}</td>
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
