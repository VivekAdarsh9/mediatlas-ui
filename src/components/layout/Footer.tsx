import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-8 bg-surface-container-low border-t border-outline-variant">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center px-4 md:px-16 max-w-[1200px] mx-auto gap-4">
        <div className="flex flex-col items-center md:items-start gap-2">
          <span className="font-heading text-xl font-semibold text-on-surface">
            Mediatas
          </span>
          <p className="text-sm font-medium text-on-surface-variant opacity-70">
            © 2024 Mediatas. Clinical Clarity in Healthcare.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary hover:underline transition-all"
          >
            About Us
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary hover:underline transition-all"
          >
            Privacy Policy
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary hover:underline transition-all"
          >
            Terms of Service
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary hover:underline transition-all"
          >
            Contact
          </Link>
          <Link
            href="#"
            className="text-on-surface-variant hover:text-primary hover:underline transition-all"
          >
            Medical Disclaimer
          </Link>
        </div>
      </div>
    </footer>
  );
}
