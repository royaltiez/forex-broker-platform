import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { verifyToken } from "@/lib/auth";

export default async function ProfilePage() {
  const token = cookies().get("token")?.value;
  if (!token) redirect("/login");

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: payload.userId }
  });

  if (!user) redirect("/login");

  return (
    <main className="page-shell">
      <div className="container">
        <div className="card" style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
          <h1 style={{ marginTop: 0, color: "#f4c95d" }}>My Profile</h1>

          <div className="grid">
            <div>
              <div className="text-muted">Full name</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{user.fullName || "Not set"}</div>
            </div>

            <div>
              <div className="text-muted">Username</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{user.username || "Not set"}</div>
            </div>

            <div>
              <div className="text-muted">Email</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700 }}>{user.email}</div>
            </div>

            <div>
              <div className="text-muted">Account status</div>
              <div style={{ fontSize: "1.2rem", fontWeight: 700, color: user.status === "ACTIVE" ? "#33d18b" : "#f4c95d" }}>
                {user.status}
              </div>
            </div>
          </div>

          <form action="/api/users/profile" method="POST" className="mt-6">
            <label className="text-muted" style={{ display: "block", marginBottom: "0.4rem" }}>Update your full name</label>
            <input className="input" name="fullName" defaultValue={user.fullName || ""} />
            <button type="submit" className="btn btn-primary mt-4">Save</button>
          </form>
        </div>
      </div>
    </main>
  );
}
