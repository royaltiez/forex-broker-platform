import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default function LoginPage() {
  const token = cookies().get("token")?.value;
  if (token) {
    const payload = verifyToken(token);
    if (payload) redirect("/dashboard");
  }

  return (
    <main className="page-shell" style={{ display: "grid", placeItems: "center" }}>
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <form action="/api/auth/login" method="POST" className="card" style={{ width: "min(420px, 92vw)", padding: "2rem" }}>
          <h1 style={{ marginTop: 0, color: "#f4c95d", fontSize: "2rem" }}>Login</h1>

          <div className="mt-4">
            <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
            <input className="input" type="email" name="email" placeholder="you@example.com" />
          </div>

          <div className="mt-4">
            <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
            <input className="input" type="password" name="password" placeholder="Enter password" />
          </div>

          <button type="submit" className="btn btn-primary mt-5" style={{ width: "100%" }}>Sign In</button>

          <div className="mt-4 text-center">
            <Link href="/forgot-password" className="text-muted">Forgot password?</Link>
          </div>

          <div className="mt-3 text-center">
            <Link href="/register" className="text-muted">Need an account? Sign up</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
