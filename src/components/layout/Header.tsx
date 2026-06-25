import Link from "next/link";
import { Search } from "lucide-react";

const navLinks = [
  { label: "Diseases", href: "/diseases" },
  { label: "Drugs", href: "/drugs" },
  { label: "Tests", href: "/tests" },
  { label: "Pregnancy", href: "/pregnancy" },
  { label: "AI Assistant", href: "/ai-assistant" },
];

interface HeaderProps {
  activeNav?: string;
}

export default function Header({ activeNav }: HeaderProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface-container-lowest border-b border-outline-variant">
      <div className="flex justify-between items-center h-16 px-4 md:px-16 max-w-[1200px] mx-auto">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="font-heading text-2xl font-bold text-primary"
          >
            Mediatas
          </Link>
          <div className="hidden md:flex gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={
                  activeNav === link.label
                    ? "text-primary border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary transition-colors"
                }
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center bg-surface-container px-4 py-1 rounded-full border border-outline-variant">
            <Search size={16} className="text-outline" />
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent border-none focus:ring-0 text-sm w-32 md:w-48 ml-2 outline-none"
            />
          </div>
          <Link
            href="/login"
            className="bg-primary text-on-primary px-6 py-1 rounded-full text-sm font-medium hover:bg-surface-tint transition-all active:opacity-80"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}
