import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";

export default function HomePage() {
  return (
    <main>
      <Navbar />

      <section className="section">
        <div className="container" style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "2.5rem", alignItems: "center" }}>
          <div>
            <p style={{ letterSpacing: "0.16em", textTransform: "uppercase", color: "#f4c95d", fontWeight: 700, fontSize: "0.8rem" }}>
              Global trading access
            </p>
            <h1 style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", lineHeight: 1.05, margin: "1rem 0" }}>
              Trade smarter with a secure, modern platform.
            </h1>
            <p className="text-muted" style={{ fontSize: "1.08rem", lineHeight: 1.7, maxWidth: "640px" }}>
              Access a professional onboarding flow, secure account management, task and reward portal, and a trusted partner infrastructure designed around compliance.
            </p>

            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "2rem" }}>
              <Link href="/register" className="btn btn-primary">Open Account</Link>
              <Link href="/login" className="btn btn-secondary">Login</Link>
            </div>

            <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", marginTop: "2rem", color: "#a9bfd4" }}>
              <span>Secure onboarding</span>
              <span>Verified accounts</span>
              <span>Reward-ready portal</span>
            </div>
          </div>

          <div className="card" style={{ padding: "2rem" }}>
            <div className="stat-grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
              <div className="stat-card">
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>Secure</div>
                <div className="text-gold" style={{ fontSize: "2rem", fontWeight: 700 }}>SSL</div>
              </div>
              <div className="stat-card">
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>Access</div>
                <div className="text-gold" style={{ fontSize: "2rem", fontWeight: 700 }}>24/5</div>
              </div>
              <div className="stat-card" style={{ gridColumn: "1 / span 2" }}>
                <div className="text-muted" style={{ fontSize: "0.8rem" }}>Account status</div>
                <div className="text-green" style={{ fontSize: "2rem", fontWeight: 700 }}>Verified</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: "0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: "1.5rem" }}>
            <div className="card" style={{ padding: "1.6rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "12px", display: "grid", placeItems: "center", background: "rgba(244, 201, 93, 0.08)", color: "#f4c95d", fontSize: "1.5rem", marginBottom: "1rem" }}>⚡</div>
              <h3>Fast onboarding</h3>
              <p className="text-muted">Simple registration, account setup, and status tracking for new users.</p>
            </div>

            <div className="card" style={{ padding: "1.6rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "12px", display: "grid", placeItems: "center", background: "rgba(244, 201, 93, 0.08)", color: "#f4c95d", fontSize: "1.5rem", marginBottom: "1rem" }}>🔒</div>
              <h3>Secure platform</h3>
              <p className="text-muted">Server-side validation, encrypted credentials, protected admin access, and clear audit trails.</p>
            </div>

            <div className="card" style={{ padding: "1.6rem" }}>
              <div style={{ width: "3rem", height: "3rem", borderRadius: "12px", display: "grid", placeItems: "center", background: "rgba(244, 201, 93, 0.08)", color: "#f4c95d", fontSize: "1.5rem", marginBottom: "1rem" }}>📊</div>
              <h3>Actionable dashboard</h3>
              <p className="text-muted">Track rewards, tasks, transactions, and support interactions from one place.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
