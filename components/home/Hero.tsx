import { getHero } from "@/lib/sanity.queries";
import type { HeroContent } from "./HeroClient";
import HeroClient from "./HeroClient";

const fallbackHero: HeroContent = {
  statusLabel: "Abierto para negocios",
  titlePrimary: "Engage",
  titleHighlight: "agency",
  description: "Dise\u00f1amos el futuro de las marcas con estrategia, dise\u00f1o y tecnolog\u00eda.",
  ctaLabel: "Ver proyectos",
  ctaHref: "#portfolio",
};

export default async function Hero() {
  let hero = fallbackHero;

  try {
    const data = await getHero();
    if (data) {
      hero = {
        ...fallbackHero,
        ...data,
        ctaHref: data.ctaHref || fallbackHero.ctaHref,
      };
    }
  } catch (error) {
    console.error("Fallo al obtener el hero desde Sanity, usando fallback:", error);
  }

  hero = {
    ...hero,
    titlePrimary: fallbackHero.titlePrimary,
    titleHighlight: fallbackHero.titleHighlight,
  };

  return <HeroClient hero={hero} />;
}
