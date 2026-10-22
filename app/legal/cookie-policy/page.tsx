import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function CookiePolicyPage() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: "3rem 0 5rem" }}>
        <h1>Cookie Policy</h1>
        <p className="text-muted">
          This website may use cookies to remember login sessions, maintain security, and support functional website features. Users can manage cookies through their browser settings.
        </p>
      </div>
      <Footer />
    </main>
  );
}
