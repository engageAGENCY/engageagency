"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/#servicios", label: "Servicios" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
];
const psychedelicArrowClass =
  "text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave";
const navArrowClass =
  "text-[1.2rem] leading-none relative -top-[2px] transition-transform duration-200 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:scale-110";

const Header = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  if (pathname?.startsWith("/studio")) {
    return null;
  }

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 backdrop-blur transition-colors duration-300 ${
        scrolled ? "bg-black/80 border-b border-white/10" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center py-3 px-6 md:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full overflow-hidden">
            <Image
              src="/logo-engage.jpg"
              alt="Engage Agency"
              fill
              sizes="128px"
              priority
            />
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-8 text-sm uppercase tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-2.5 hover:text-gray-300"
            >
              <span aria-hidden className={`${navArrowClass} ${psychedelicArrowClass}`}>
                {"\u2197"}
              </span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="relative ml-4 flex items-center gap-3">
          <Link href="/contact">
            <button className="bg-white text-black hover:bg-gray-200 font-semibold py-2 px-4 rounded-full text-xs uppercase tracking-wide">
              {"Cont\u00e1ctanos"}
            </button>
          </Link>

          <div className="relative md:hidden">
            <button
              type="button"
              aria-label={"Abrir men\u00fa"}
              aria-expanded={menuOpen}
              aria-controls="header-menu"
              onClick={() => setMenuOpen((open) => !open)}
              className="rounded-full p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave"
            >
              <span className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-full bg-black/90">
                <span className="h-[2px] w-5 rounded-full bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave" />
                <span className="h-[2px] w-5 rounded-full bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave" />
                <span className="h-[2px] w-5 rounded-full bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave" />
              </span>
            </button>

            <div
              id="header-menu"
              className={`absolute right-0 top-full mt-3 min-w-[200px] rounded-2xl p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave transition-all duration-200 ${
                menuOpen ? "opacity-100 translate-y-0" : "pointer-events-none opacity-0 -translate-y-2"
              }`}
            >
              <div className="rounded-2xl bg-black/90 px-4 py-4 text-sm uppercase tracking-wide backdrop-blur">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="group flex items-center gap-2.5 rounded-lg px-3 py-2 transition hover:bg-white/10"
                  >
                    <span aria-hidden className={`${navArrowClass} ${psychedelicArrowClass}`}>
                      {"\u2197"}
                    </span>
                    <span>{link.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
