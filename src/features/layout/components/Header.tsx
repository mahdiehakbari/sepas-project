"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full border-b border-black/[.08] dark:border-white/[.145] bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Sepas
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}


