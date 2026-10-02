import Link from "next/link";
import { Mail } from "lucide-react";
import { navLinks, site } from "@/lib/content";

export default function Footer() {
  return (
    <footer className="border-t border-line/70">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-6 py-12 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div>
          <p className="text-xl font-extrabold tracking-tight">
            {site.name}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            {site.course}, {site.year}
          </p>
        </div>
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-muted transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <a
          href={`mailto:${site.email}`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-white transition-colors hover:text-accent"
        >
          <Mail size={16} />
          {site.email}
        </a>
      </div>
      <p className="border-t border-line/70 px-6 py-5 text-center text-xs text-muted">
        {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}
