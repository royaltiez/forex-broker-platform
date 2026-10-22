import "./globals.css";

export const metadata = {
  title: "PrimeTrade",
  description: "Secure broker onboarding and user platform"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
