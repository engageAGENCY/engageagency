import Image from "next/image";
import Link from "next/link";

type ShowcaseCard = {
  title: string;
  description: string;
  image: string;
};

const showcaseCards: ShowcaseCard[] = [
  {
    title: "Direccion visual para marcas premium",
    description:
      "Curaduria de contenido y linea grafica para perfiles que buscan una identidad clara y consistente.",
    image: "/optimized/celulares1-1600.webp",
  },
  {
    title: "Contenido orientado a conversion",
    description:
      "Piezas editoriales pensadas para captar atencion, sostener alcance y llevar trafico a conversion.",
    image: "/optimized/celulares2-1600.webp",
  },
  {
    title: "Cuentas por nicho y objetivo",
    description:
      "Ejecuciones para salud, belleza y servicios profesionales con mensajes adaptados por audiencia.",
    image: "/optimized/celulares3-1600.webp",
  },
  {
    title: "Portafolio operativo de la agencia",
    description:
      "Material real publicado para clientes, documentado por campanas y por categoria de servicio.",
    image: "/optimized/celulares4-1600.webp",
  },
];

type VisualCardProps = {
  card: ShowcaseCard;
  priority?: boolean;
};

function VisualCard({ card, priority = false }: VisualCardProps) {
  return (
    <article className="flex w-full flex-col items-center gap-5">
      <div className="relative w-full max-w-[min(92vw,36rem)] aspect-[4/3]">
        <Image
          src={card.image}
          alt={card.title}
          fill
          priority={priority}
          className="object-contain drop-shadow-[0_22px_36px_rgba(0,0,0,0.55)]"
          sizes="(max-width: 640px) 92vw, (max-width: 1280px) 44vw, 560px"
        />
      </div>

      <div className="w-full max-w-[min(92vw,36rem)] rounded-2xl p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave">
        <div className="rounded-2xl border border-white/10 bg-black/80 px-5 py-5 sm:px-6 sm:py-6 text-center">
          <h4 className="text-lg sm:text-xl font-semibold leading-snug text-transparent bg-clip-text bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave">
            {card.title}
          </h4>
          <p className="mt-2 text-sm sm:text-[0.96rem] text-zinc-300 leading-relaxed">{card.description}</p>
        </div>
      </div>
    </article>
  );
}

export default function VisualCases() {
  return (
    <section id="casos-visuales" className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-white/10">
      <div className="mx-auto w-full max-w-[min(92rem,100%)] space-y-8 sm:space-y-10">
        <div className="text-center space-y-3 sm:space-y-4">
          <p className="text-xs uppercase tracking-[0.3em] text-white/55">Casos visuales</p>
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Trabajo real para marcas reales</h3>
          <p className="text-sm sm:text-base text-zinc-300 max-w-3xl mx-auto">
            Seleccion de proyectos ejecutados por la agencia con enfoque en resultados, no en piezas de relleno.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-y-12 gap-x-10 place-items-center">
          {showcaseCards.map((card, index) => (
            <VisualCard
              key={`${card.image}-${index}`}
              card={card}
              priority={index === 0}
            />
          ))}
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
