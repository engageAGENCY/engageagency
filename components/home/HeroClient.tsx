"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export type HeroContent = {
  statusLabel: string;
  titlePrimary: string;
  titleHighlight: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

type HeroClientProps = {
  hero: HeroContent;
};

export default function HeroClient({ hero }: HeroClientProps) {
  const titlePrimary = hero.titlePrimary ?? "";

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden pt-24 pb-8 sm:pt-32 md:pt-36 text-center">
      <div className="absolute inset-0 bg-grid-small z-0 opacity-40" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/80 to-background z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[600px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="leading-[0.98] mb-5 sm:mb-7 text-white"
        >
          <span className="sr-only">{titlePrimary}</span>
          <span
            aria-hidden
            className="mx-auto block w-[min(92vw,640px)] sm:w-[min(82vw,720px)] md:w-[min(70vw,720px)] lg:w-[min(60vw,700px)] aspect-[2.6/1] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave pb-1 sm:pb-2"
            style={{
              WebkitMask: "url(/logo_engage_hero.svg) center / contain no-repeat",
              mask: "url(/logo_engage_hero.svg) center / contain no-repeat",
            }}
          />
          <span className="block font-geo font-normal text-[clamp(1.75rem,6vw,3.5rem)] leading-[0.9] tracking-tight text-white mt-4 sm:mt-6 lg:mt-5">
            {hero.titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-zinc-400 max-w-2xl mx-auto mb-7 sm:mb-9 text-[clamp(1rem,4.4vw,1.2rem)] font-light text-balance px-2"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-2.5 sm:gap-3"
        >
          <Link
            href={hero.ctaHref}
            className="bg-white text-black h-11 sm:h-12 px-6 sm:px-8 rounded-full font-bold uppercase text-sm flex items-center gap-2 hover:bg-zinc-200 transition"
          >
            {hero.ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#servicios"
            className="h-11 sm:h-12 px-6 sm:px-8 rounded-full font-bold uppercase text-sm flex items-center gap-2 border border-white/30 text-white hover:border-white hover:text-white transition"
          >
            Ver servicios <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
