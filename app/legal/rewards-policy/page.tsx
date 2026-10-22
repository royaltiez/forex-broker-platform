import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function RewardsPolicyPage() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: "3rem 0 5rem" }}>
        <h1>Rewards Policy</h1>
        <p className="text-muted">
          Rewards are credited based on task completion, verification checks, and platform rules. All rewards are subject to validation and review by authorized administrators. Duplicate or fraudulent actions may be rejected.
        </p>
      </div>
      <Footer />
    </main>
  );
}
