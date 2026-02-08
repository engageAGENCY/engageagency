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
  const titlePrimaryLast = titlePrimary.slice(-1);
  const titlePrimaryHead = titlePrimary.slice(0, -1);
  const liftLastLetter = titlePrimaryLast.toLowerCase() === "g";

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-28 pb-12 sm:pt-36 text-center">
      <div className="absolute inset-0 bg-grid-small z-0 opacity-40" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/80 to-background z-0" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[420px] h-[420px] md:w-[600px] md:h-[600px] bg-indigo-600/20 rounded-full blur-[120px] -z-10" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="leading-[0.98] mb-8 text-white"
        >
          <span className="block font-logo text-[clamp(6.25rem,26vw,18.5rem)] md:text-[clamp(6.25rem,17.5vw,16.5rem)] lg:text-[clamp(6.25rem,12vw,14rem)] leading-[1.1] text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave pb-6 sm:pb-8 md:pb-[0.2em] lg:pb-[0.18em]">
            {liftLastLetter ? (
              <>
                {titlePrimaryHead}
                <span className="inline-block relative -top-[0.12em]">
                  {titlePrimaryLast}
                </span>
              </>
            ) : (
              titlePrimary
            )}
          </span>
          <span className="block font-geo font-normal text-[clamp(1.75rem,6vw,3.5rem)] leading-[0.9] tracking-tight text-white mt-4 sm:mt-6 lg:mt-5">
            {hero.titleHighlight}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-zinc-400 max-w-2xl mx-auto mb-10 text-[clamp(1.05rem,4.5vw,1.25rem)] font-light text-balance px-2"
        >
          {hero.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col items-center gap-3 sm:gap-4"
        >
          <Link
            href={hero.ctaHref}
            className="bg-white text-black h-12 sm:h-12 px-7 sm:px-8 rounded-full font-bold uppercase text-sm flex items-center gap-2 hover:bg-zinc-200 transition"
          >
            {hero.ctaLabel} <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/#servicios"
            className="h-12 sm:h-12 px-7 sm:px-8 rounded-full font-bold uppercase text-sm flex items-center gap-2 border border-white/30 text-white hover:border-white hover:text-white transition"
          >
            Ver servicios <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
