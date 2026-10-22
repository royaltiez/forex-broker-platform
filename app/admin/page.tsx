import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export default async function AdminPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  const admin = await prisma.user.findUnique({
    where: { id: payload.userId }
  });

  if (!admin || admin.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const users = await prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    take: 10
  });

  const submissions = await prisma.taskSubmission.findMany({
    include: { user: true, task: true },
    orderBy: { createdAt: "desc" },
    take: 10
  });

  return (
    <main className="page-shell">
      <div className="container">
        <h1 style={{ marginBottom: "1.5rem" }}>Admin Dashboard</h1>

        <div className="stat-grid">
          <div className="stat-card">
            <div className="text-muted">Users</div>
            <div style={{ fontSize: "2rem", fontWeight: 700 }}>{users.length}</div>
          </div>

          <div className="stat-card">
            <div className="text-muted">Tasks</div>
            <div style={{ fontSize: "2rem", fontWeight: 700 }}>{submissions.length}</div>
          </div>

          <div className="stat-card">
            <div className="text-muted">Support</div>
            <div style={{ fontSize: "2rem", fontWeight: 700 }}>0</div>
          </div>

          <div className="stat-card">
            <div className="text-muted">Status</div>
            <div style={{ fontSize: "1.8rem", fontWeight: 700, color: "#33d18b" }}>Active</div>
          </div>
        </div>

        <div className="card" style={{ padding: "1.5rem", marginTop: "2rem" }}>
          <h3 style={{ marginTop: 0 }}>Recent Task Review</h3>

          {submissions.length === 0 ? (
            <p className="text-muted">No submissions yet.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>User</th>
                  <th>Task</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((item) => (
                  <tr key={item.id}>
                    <td>{item.user.email}</td>
                    <td>{item.task.title}</td>
                    <td>{item.status}</td>
                    <td>
                      <form action="/api/admin/approve" method="POST">
                        <input type="hidden" name="submissionId" value={item.id} />
                        <button type="submit" className="btn btn-primary">Approve</button>
                      </form>
                    </td>
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
