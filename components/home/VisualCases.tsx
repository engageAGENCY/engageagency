import Image from "next/image";
import Link from "next/link";

type ShowcaseCard = {
  title: string;
  description: string;
  image: string;
  result: string;
};

const showcaseCards: ShowcaseCard[] = [
  {
    title: "Dirección visual para marcas premium",
    description:
      "Curaduria de contenido y linea grafica para perfiles que necesitan diferenciarse con coherencia visual.",
    image: "/optimized/eng-agency2-1200.webp",
    result: "Identidad consistente y mayor recordación de marca",
  },
  {
    title: "Contenido orientado a conversión",
    description: "Piezas editoriales diseñadas para captar atención, sostener alcance y llevar tráfico a conversión.",
    image: "/optimized/eng-agency-1200.webp",
    result: "Mejor tasa de respuesta en publicaciones y mensajes",
  },
  {
    title: "Cuentas por nicho y objetivo",
    description:
      "Casos ejecutados para salud, belleza y servicios profesionales con objetivos comerciales definidos.",
    image: "/optimized/nn-1200.webp",
    result: "Mensajes adaptados por audiencia y por etapa del cliente",
  },
  {
    title: "Portafolio operativo de la agencia",
    description: "Material publicado para clientes reales, documentado por campañas y por categoria de servicio.",
    image: "/optimized/ss-1200.webp",
    result: "Ejecucion real del dia a dia en gestion de cuentas",
  },
];

type VisualCardProps = {
  card: ShowcaseCard;
  aspect: string;
  priority?: boolean;
};

function VisualCard({ card, aspect, priority = false }: VisualCardProps) {
  return (
    <article className="rounded-2xl border border-white/12 bg-black/90 overflow-hidden shadow-[0_24px_60px_-45px_rgba(0,0,0,1)]">
      <div className={`relative w-full ${aspect}`}>
        <Image
          src={card.image}
          alt={card.title}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 1279px) 100vw, 50vw"
        />
      </div>
      <div className="border-t border-white/10 bg-black/80 px-5 py-5 sm:px-6 sm:py-6">
        <h4 className="text-lg sm:text-xl font-semibold text-white leading-snug">{card.title}</h4>
        <p className="mt-2 text-sm sm:text-[0.96rem] text-zinc-300 leading-relaxed">{card.description}</p>
        <p className="mt-3 text-xs sm:text-sm text-fuchsia-200/85">
          <span className="font-semibold text-fuchsia-100">Impacto:</span> {card.result}
        </p>
      </div>
    </article>
  );
}

export default function VisualCases() {
  return (
    <section id="casos-visuales" className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-8 sm:space-y-10">
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">Casos visuales</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Trabajo real para marcas reales</h3>
          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl mx-auto">
            Selección de proyectos ejecutados por la agencia con enfoque en resultados, no en piezas de relleno.
          </p>
        </div>

        <div className="space-y-5 xl:hidden">
          <VisualCard card={showcaseCards[0]} aspect="aspect-[16/10]" priority />
          <VisualCard card={showcaseCards[1]} aspect="aspect-[16/10]" />
          <VisualCard card={showcaseCards[2]} aspect="aspect-[16/10]" />
          <VisualCard card={showcaseCards[3]} aspect="aspect-[16/10]" />
        </div>

        <div className="hidden xl:block space-y-6">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-7">
              <VisualCard card={showcaseCards[0]} aspect="aspect-[16/10]" priority />
            </div>
            <div className="col-span-5 space-y-6">
              <article className="rounded-2xl border border-white/12 bg-zinc-950 p-6">
                <p className="text-xs uppercase tracking-[0.3em] text-white/55">Enfoque</p>
                <h4 className="mt-3 text-2xl font-semibold text-white leading-tight">Dirección de contenido con criterio comercial</h4>
                <p className="mt-3 text-sm text-zinc-300 leading-relaxed">
                  Cada pieza responde a un objetivo concreto: atraer, educar, posicionar o convertir. Esto mantiene
                  los perfiles activos con orden y una narrativa clara.
                </p>
              </article>
              <VisualCard card={showcaseCards[1]} aspect="aspect-[16/10]" />
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-6">
              <VisualCard card={showcaseCards[2]} aspect="aspect-[16/10]" />
            </div>
            <div className="col-span-6">
              <VisualCard card={showcaseCards[3]} aspect="aspect-[16/10]" />
            </div>
          </div>
        </div>

        <div className="flex justify-center pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-white text-black text-xs sm:text-sm font-semibold uppercase tracking-wide px-6 py-3 hover:bg-zinc-200 transition"
          >
            Solicitar propuesta
          </Link>
        </div>
      </div>
    </section>
  );
}
