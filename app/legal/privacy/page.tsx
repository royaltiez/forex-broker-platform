import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function PrivacyPage() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: "3rem 0 5rem" }}>
        <h1>Privacy Policy</h1>
        <p className="text-muted">
          We collect personal and account information needed to provide the service, verify identity where required, process transactions, and maintain compliance with legal obligations. We store this information securely and restrict access to authorized personnel.
        </p>
        <p className="text-muted">
          We do not sell personal data. We may use third-party providers for compliance, payments, email communication, or infrastructure services. User data may be processed in accordance with your legal obligations and our policies.
        </p>
      </div>
      <Footer />
    </main>
  );
}
