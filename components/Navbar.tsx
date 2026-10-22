import Link from "next/link";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="site-brand">PrimeTrade</Link>

        <nav className="nav-links">
          <Link href="/" className="text-muted">Home</Link>
          <Link href="/dashboard" className="text-muted">Dashboard</Link>
          <Link href="/tasks" className="text-muted">Tasks</Link>
          <Link href="/rewards" className="text-muted">Rewards</Link>
          <Link href="/support" className="text-muted">Support</Link>
          <Link href="/login" className="btn btn-secondary">Login</Link>
          <Link href="/register" className="btn btn-primary">Open Account</Link>
        </nav>
      </div>
    </header>
  );
}
