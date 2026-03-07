import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextReactComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { getProjectBySlug, getProjectSlugs } from "@/lib/sanity.queries";

export const revalidate = 60;

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

function optimizedSanityImage(source: any) {
  return urlFor(source).auto("format").quality(82).fit("max");
}

function resolveAspectRatio(width?: number, height?: number, fallback = 16 / 9) {
  if (!width || !height) return fallback;
  const ratio = width / height;
  if (!Number.isFinite(ratio) || ratio <= 0) return fallback;
  return ratio;
}

const portableTextComponents = {
  block: {
    h2: (props) => (
      <h2 className="text-xl sm:text-2xl font-semibold mt-8 mb-3">{props.children}</h2>
    ),
    h3: (props) => (
      <h3 className="text-lg sm:text-xl font-semibold mt-6 mb-2">{props.children}</h3>
    ),
    normal: (props) => (
      <p className="text-zinc-300 leading-relaxed mb-4">{props.children}</p>
    ),
  },
  list: {
    bullet: (props) => (
      <ul className="list-disc pl-5 space-y-2 text-zinc-300 mb-4">{props.children}</ul>
    ),
  },
  listItem: {
    bullet: (props) => <li>{props.children}</li>,
  },
} satisfies Partial<PortableTextReactComponents>;

function isVideoUrl(url: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url);
}

function getEmbedUrl(url: string) {
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("youtube.com")) {
    const id = new URL(url).searchParams.get("v");
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("vimeo.com")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  if (!Array.isArray(slugs)) {
    return [];
  }

  return slugs
    .filter((slug): slug is string => typeof slug === "string" && slug.length > 0)
    .map((slug) => ({ slug }));
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  const profileUrl = project.profileLink || project.link || null;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 sm:px-6 lg:px-10 xl:px-14 pt-32 pb-14 sm:pt-40 sm:pb-20">
        <div className="mx-auto w-full max-w-[min(100%,1120px)] space-y-8 sm:space-y-10">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <span aria-hidden>&larr;</span>
              <span>Volver al portafolio</span>
            </Link>
            {profileUrl ? (
              <a
                href={profileUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex rounded-full p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave shadow-[0_0_28px_rgba(168,85,247,0.35)]"
              >
                <span className="rounded-full bg-black px-4 py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-zinc-900">
                  Ver perfil completo
                </span>
              </a>
            ) : null}
          </div>

          <div className="rounded-2xl border border-white/10 bg-zinc-900/30 p-5 sm:p-7 md:p-8 space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">PORTAFOLIO</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display leading-tight">{project.title}</h1>
            {project.description && (
              <p className="text-base sm:text-lg text-zinc-300 max-w-3xl text-balance">{project.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm text-zinc-300">
              {project.client ? (
                <span className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">Cliente: {project.client}</span>
              ) : null}
              {project.year ? (
                <span className="rounded-xl border border-white/10 bg-black/30 px-3 py-2">A&ntilde;o: {project.year}</span>
              ) : null}
            </div>
          </div>

          {project.image?.asset && (
            <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-2 sm:p-3">
              <div
                className="relative w-full rounded-2xl overflow-hidden bg-black"
                style={{ aspectRatio: resolveAspectRatio(project.image.width, project.image.height, 16 / 9) }}
              >
                <Image
                  src={optimizedSanityImage(project.image).width(2200).url()}
                  alt={project.title}
                  fill
                  className="object-contain bg-black"
                  sizes="(max-width: 1024px) 100vw, min(88vw, 1120px)"
                />
              </div>
            </div>
          )}

          {project.services?.length ? (
            <div className="flex flex-wrap gap-2 rounded-2xl border border-white/10 bg-zinc-900/20 p-4">
              {project.services.map((service: string) => (
                <span key={service} className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10">
                  {service}
                </span>
              ))}
            </div>
          ) : null}

          {project.body?.length ? (
            <div className="rounded-2xl border border-white/10 bg-zinc-900/20 p-5 sm:p-6 max-w-none">
              <PortableText value={project.body} components={portableTextComponents} />
            </div>
          ) : null}

          {project.results?.length ? (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-lg font-semibold mb-4">Resultados</h2>
              <ul className="space-y-2 text-zinc-300">
                {project.results.map((result: string, index: number) => (
                  <li key={`${result}-${index}`} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-white" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {project.gallery?.length ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Galer&iacute;a</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {project.gallery.map((image: any, index: number) => (
                  <div
                    key={image._key || index}
                    className="relative w-full rounded-2xl overflow-hidden border border-white/10 bg-black"
                    style={{ aspectRatio: resolveAspectRatio(image.width, image.height, 4 / 3) }}
                  >
                    <Image
                      src={optimizedSanityImage(image).width(1600).url()}
                      alt={image.alt || project.title}
                      fill
                      className="object-contain bg-black"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {project.videos?.length ? (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Videos</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                {project.videos.map((video: any, index: number) => {
                  if (!video?.url) return null;
                  const embedUrl = getEmbedUrl(video.url);
                  return isVideoUrl(video.url) ? (
                    <div key={video._key || index} className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10">
                      <iframe
                        src={embedUrl}
                        title={video.title || `Video ${index + 1}`}
                        className="h-full w-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <video
                      key={video._key || index}
                      controls
                      className="w-full rounded-2xl border border-white/10"
                    >
                      <source src={video.url} />
                    </video>
                  );
                })}
              </div>
            </div>
          ) : null}

          <div className="pt-2">
            <Link
              href="/#portfolio"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <span aria-hidden>&larr;</span>
              <span>Volver al portafolio</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
