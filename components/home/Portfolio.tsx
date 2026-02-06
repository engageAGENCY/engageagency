import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { getProjects } from "@/lib/sanity.queries";
import { client } from "@/lib/sanity.client";

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

const hardcodedPortfolioItems = [
  {
    title: "Proyecto Alfa",
    description:
      "Una soluci\u00f3n de comercio electr\u00f3nico completa con un dise\u00f1o personalizado y optimizaci\u00f3n para motores de b\u00fasqueda.",
    image: "/placeholder-image.png",
  },
  {
    title: "Proyecto Beta",
    description:
      "Desarrollo de una aplicaci\u00f3n web interactiva para la gesti\u00f3n de eventos y la venta de entradas.",
    image: "/placeholder-image.png",
  },
  {
    title: "Proyecto Gamma",
    description:
      "Creaci\u00f3n de una identidad de marca moderna y un sitio web corporativo para una startup tecnol\u00f3gica.",
    image: "/placeholder-image.png",
  },
  {
    title: "Proyecto Delta",
    description:
      "Dise\u00f1o y desarrollo de una plataforma de aprendizaje en l\u00ednea con contenido de video y seguimiento del progreso.",
    image: "/placeholder-image.png",
  },
];

const Portfolio = async () => {
  let projects = [];
  try {
    projects = await getProjects();
  } catch (error) {
    console.error("Fallo al obtener los proyectos de Sanity, usando datos harcodeados:", error);
    projects = hardcodedPortfolioItems;
  }

  return (
    <section id="portfolio" className="py-20 sm:py-24 px-4 sm:px-6 md:px-12 border-t border-white/10 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-10 sm:mb-12">
          <div>
            <h2 className="text-3xl sm:text-4xl font-display uppercase">Portafolio de Trabajo</h2>
            <p className="text-zinc-400 text-sm sm:text-base mt-2 text-balance">
              Proyectos que combinan dise&ntilde;o, tecnolog&iacute;a y estrategia.
            </p>
          </div>
          <span className="text-xs uppercase tracking-[0.3em] text-zinc-500">Proyectos destacados</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((item: any, index: number) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-2xl border border-white/10 overflow-hidden flex flex-col shadow-lg shadow-black/20"
            >
              {item.image && (item.image.src || item.image.asset) ? (
                <div className="relative w-full aspect-[4/3] bg-black/80">
                  <Image
                    src={item.image.src || urlFor(item.image).width(800).height(600).url()}
                    alt={item.title}
                    fill
                    className="object-contain p-6"
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
