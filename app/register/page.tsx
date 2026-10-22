import Link from "next/link";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

export default function RegisterPage() {
  const token = cookies().get("token")?.value;
  if (token) {
    const payload = verifyToken(token);
    if (payload) redirect("/dashboard");
  }

  return (
    <main className="page-shell" style={{ display: "grid", placeItems: "center" }}>
      <div style={{ width: "100%", display: "grid", placeItems: "center" }}>
        <form action="/api/auth/register" method="POST" className="card" style={{ width: "min(540px, 92vw)", padding: "2rem" }}>
          <h1 style={{ marginTop: 0, color: "#f4c95d", fontSize: "2.2rem" }}>Create Account</h1>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div>
              <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Full name</label>
              <input className="input" name="fullName" placeholder="John Doe" />
            </div>

            <div>
              <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Username</label>
              <input className="input" name="username" placeholder="johndoe" />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Email</label>
            <input className="input" type="email" name="email" placeholder="you@example.com" />
          </div>

          <div className="mt-4">
            <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Password</label>
            <input className="input" type="password" name="password" placeholder="Minimum 8 characters" />
          </div>

          <div className="mt-4">
            <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Confirm password</label>
            <input className="input" type="password" name="confirmPassword" placeholder="Repeat password" />
          </div>

          <div className="mt-4">
            <label className="text-muted" style={{ display: "block", marginBottom: "0.5rem" }}>Country</label>
            <input className="input" name="country" placeholder="United Kingdom" />
          </div>

          <label className="mt-4" style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start", color: "#a9bfd4" }}>
            <input type="checkbox" name="terms" />
            <span>I agree to the Terms and Privacy Policy.</span>
          </label>

          <button type="submit" className="btn btn-primary mt-5" style={{ width: "100%" }}>Create Account</button>

          <div className="mt-4 text-center">
            <Link href="/login" className="text-muted">Already have an account? Sign in</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
