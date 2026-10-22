import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RefundPolicyPage() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: "3rem 0 5rem" }}>
        <h1>Refund Policy</h1>
        <p className="text-muted">
          Refund policies depend on the business model, payment provider rules, and legal requirements. This website should not be used for commercial activity that violates the applicable payment terms or local laws.
        </p>
      </div>
      <Footer />
    </main>
  );
}
