import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/auth";

export default function SupportPage() {
  const token = cookies().get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = verifyToken(token);
  if (!payload) redirect("/login");

  return (
    <main className="page-shell">
      <div className="container">
        <div className="card" style={{ padding: "2rem", maxWidth: "700px", margin: "0 auto" }}>
          <h1 style={{ marginTop: 0, color: "#f4c95d" }}>Support</h1>

          <form action="/api/support/create" method="POST">
            <div className="mt-4">
              <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Subject</label>
              <input className="input" name="subject" placeholder="Need help with my account" />
            </div>

            <div className="mt-4">
              <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Message</label>
              <textarea className="textarea" rows={6} name="message" placeholder="Describe your issue or question" />
            </div>

            <button type="submit" className="btn btn-primary mt-4">Submit Ticket</button>
          </form>
        </div>
      </div>
    </main>
  );
}
