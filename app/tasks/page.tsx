import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export default async function TasksPage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  const tasks = await prisma.task.findMany({
    where: { status: "ACTIVE" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <main className="page-shell">
      <div className="container">
        <h1 style={{ marginBottom: "1.5rem" }}>Available Tasks</h1>

        <div className="grid">
          {tasks.map((task) => (
            <div className="card" key={task.id} style={{ padding: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
                <div>
                  <h3 style={{ margin: 0 }}>{task.title}</h3>
                  <p className="text-muted" style={{ margin: "0.5rem 0 0" }}>{task.description}</p>
                </div>
                <div style={{ color: "#f4c95d", fontWeight: 700, fontSize: "1.2rem" }}>
                  ${task.rewardAmount.toString()}
                </div>
              </div>

              <div className="mt-4">
                <form action="/api/tasks/submit" method="POST">
                  <input type="hidden" name="taskId" value={task.id} />
                  <textarea className="textarea" name="notes" rows={3} placeholder="Add proof details or notes"></textarea>
                  <button type="submit" className="btn btn-primary mt-3">Submit Task</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
