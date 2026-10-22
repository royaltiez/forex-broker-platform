import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function TermsPage() {
  return (
    <main>
      <Navbar />
      <div className="container" style={{ padding: "3rem 0 5rem" }}>
        <h1>Terms and Conditions</h1>
        <p className="text-muted">
          This website is designed for a regulated business model and must be reviewed with the applicable legal, payment, and compliance requirements before launch. Users are responsible for understanding the services provided, descriptions of the platform, and the associated rules and restrictions.
        </p>
        <p className="text-muted">
          By accessing this platform, you agree to use it in compliance with all applicable laws and regulations. You are responsible for the accuracy of your information and for not impersonating another person or engaging in fraudulent or prohibited activity.
        </p>
      </div>
      <Footer />
    </main>
  );
}
