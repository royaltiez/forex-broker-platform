import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: "3rem 0 5rem" }}>
        <h1>Contact</h1>
        <p className="text-muted">Email: support@yourdomain.com</p>
        <p className="text-muted">Phone: +1 (000) 000-0000</p>
      </div>
      <Footer />
    </main>
  );
}
