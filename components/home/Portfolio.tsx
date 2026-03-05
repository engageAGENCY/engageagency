import Image from "next/image";
import Link from "next/link";
import imageUrlBuilder from "@sanity/image-url";
import { getProjects } from "@/lib/sanity.queries";
import { client } from "@/lib/sanity.client";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const Portfolio = async () => {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Fallo al obtener los proyectos de Sanity:", error);
    projects = [];
  }

  if (!Array.isArray(projects) || projects.length === 0) {
    return null;
  }

  return (
    <section id="portfolio" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display uppercase">Casos de estudio</h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 text-balance">
              Proyectos documentados con contexto, estrategia aplicada y resultado.
            </p>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Proyectos destacados</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((item: any, index: number) => {
            const cardContent = (
              <div className="rounded-2xl bg-zinc-900 overflow-hidden flex flex-col shadow-lg shadow-black/20 transition-transform duration-200 group-hover:-translate-y-1">
                {item.image && (item.image.src || item.image.asset) ? (
                  <div className="relative w-full aspect-[4/3]">
                    <Image
                      src={item.image.src || urlFor(item.image).width(800).height(600).url()}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="relative w-full aspect-[4/3] flex items-center justify-center text-zinc-500 font-mono text-xs">
                    IMAGEN NO DISPONIBLE
                  </div>
                )}
                <div className="p-5 sm:p-6 flex flex-col gap-2">
                  <h3 className="text-xl sm:text-2xl font-bold">{item.title}</h3>
                  <p className="text-zinc-400 text-sm sm:text-base text-balance">{item.description}</p>
                  <span className="mt-4 inline-flex items-center justify-center text-xs uppercase font-semibold text-black bg-white px-4 py-2 rounded-full self-center transition">
                    Ver trabajo realizado
                  </span>
                </div>
              </div>
            );

            const wrapperClass =
              "group rounded-2xl p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave";

            return item.slug ? (
              <Link key={index} href={`/proyectos/${item.slug}`} className={wrapperClass}>
                {cardContent}
              </Link>
            ) : (
              <div key={index} className={wrapperClass}>
                {cardContent}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
