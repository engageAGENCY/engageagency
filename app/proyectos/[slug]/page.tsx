import Image from "next/image";
import { notFound } from "next/navigation";
import { PortableText, type PortableTextReactComponents } from "@portabletext/react";
import imageUrlBuilder from "@sanity/image-url";
import { client } from "@/lib/sanity.client";
import { getProjectBySlug } from "@/lib/sanity.queries";

export const revalidate = 60;

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
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

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="px-4 sm:px-6 md:px-12 pt-28 pb-16">
        <div className="max-w-5xl mx-auto space-y-10">
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.35em] text-zinc-500">Proyecto</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-display">{project.title}</h1>
            {project.description && (
              <p className="text-base sm:text-lg text-zinc-300 max-w-3xl">{project.description}</p>
            )}
            <div className="flex flex-wrap gap-4 text-sm text-zinc-400">
              {project.client && <span>Cliente: {project.client}</span>}
              {project.year && <span>A&ntilde;o: {project.year}</span>}
              {project.link && (
                <a className="text-white hover:text-gray-200 underline" href={project.link} target="_blank" rel="noreferrer">
                  Ver sitio
                </a>
              )}
            </div>
          </div>

          {project.image?.asset && (
            <div className="relative w-full aspect-[16/9] rounded-3xl overflow-hidden border border-white/10 bg-black">
              <Image
                src={urlFor(project.image).width(1600).height(900).url()}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 70vw"
              />
            </div>
          )}

          {project.services?.length ? (
            <div className="flex flex-wrap gap-2">
              {project.services.map((service: string) => (
                <span key={service} className="px-3 py-1 rounded-full text-xs bg-white/10 border border-white/10">
                  {service}
                </span>
              ))}
            </div>
          ) : null}

          {project.body?.length ? (
            <div className="max-w-none">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((image: any, index: number) => (
                  <div key={image._key || index} className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={urlFor(image).width(1200).height(900).url()}
                      alt={image.alt || project.title}
                      fill
                      className="object-cover"
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>
      </section>
    </main>
  );
}
