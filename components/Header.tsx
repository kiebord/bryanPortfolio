"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navLinks, site } from "@/lib/content";

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line/70 bg-ink/70 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
        <Link href="/" className="text-lg font-extrabold tracking-tight sm:text-xl">
          {site.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 md:flex">
          {navLinks.map((link) => {
            const active = isActive(pathname, link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`border-b-2 py-1 text-sm font-semibold transition-colors ${
                  active
                    ? "border-accent text-accent"
                    : "border-transparent text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-line text-white transition-colors hover:border-accent md:hidden"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          aria-label="Mobile"
          className="border-t border-line/70 bg-ink/95 px-6 pb-6 pt-3 backdrop-blur-xl md:hidden"
        >
          <ul className="flex flex-col">
            {navLinks.map((link) => {
              const active = isActive(pathname, link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`block border-b border-line/60 py-4 text-3xl font-extrabold tracking-tight ${
                      active ? "text-accent" : "text-white"
                    }`}
                  >
                    <span
                      className={`border-b-2 pb-1 ${
                        active ? "border-accent" : "border-transparent"
                      }`}
                    >
                      {link.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
    </header>
  );
}
