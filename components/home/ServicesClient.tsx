"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type Service = {
  number?: string;
  title?: string;
  description?: string;
  items?: string[];
  reels?: {
    _key?: string;
    title?: string;
    url?: string;
    posterUrl?: string;
    poster?: {
      asset?: {
        url?: string;
      };
    };
  }[];
  prefillPlan?: string;
  serviceKind?: "service" | "plan";
};

type ServicesClientProps = {
  services: Service[];
};

const serviceVideoByNumber: Record<string, string> = {
  "01": "/videos/service-01.mp4",
  "02": "/videos/service-02.mp4",
  "03": "/videos/service-03.mp4",
  "04": "/videos/service-04.mp4",
  "05": "/videos/service-05.mp4",
  "06": "/videos/service-06.mp4",
};

const servicePosterByNumber: Record<string, string> = {
  "01": "/videos/posters/service-01.jpg",
  "02": "/videos/posters/service-02.jpg",
  "03": "/videos/posters/service-03.jpg",
  "04": "/videos/posters/service-04.jpg",
  "05": "/videos/posters/service-05.jpg",
  "06": "/videos/posters/service-06.jpg",
};

const planCarouselImages = [
  "/carousel/foto1.jpg",
  "/carousel/foto2.jpg",
  "/carousel/foto3.jpg",
  "/carousel/foto4.jpg",
  "/carousel/foto5.jpg",
  "/carousel/foto6.jpg",
  "/carousel/foto7.jpg",
  "/carousel/foto8.jpg",
  "/carousel/foto9.jpg",
  "/carousel/foto10.jpg",
  "/carousel/foto11.jpg",
  "/carousel/foto12.jpg",
  "/carousel/foto13.jpg",
  "/carousel/foto14.jpg",
];

function normalizeServiceNumber(value?: string) {
  if (!value) return "";
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return digits.padStart(2, "0").slice(-2);
}

function isDirectVideo(url?: string) {
  if (!url) return false;
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(url);
}

function isYouTube(url?: string) {
  if (!url) return false;
  return /youtube\.com|youtu\.be/i.test(url);
}

function isVimeo(url?: string) {
  if (!url) return false;
  return /vimeo\.com/i.test(url);
}

function getEmbedUrl(url?: string) {
  if (!url) return "";
  if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    return id ? `https://www.youtube.com/embed/${id}` : url;
  }
  if (url.includes("youtube.com")) {
    try {
      const id = new URL(url).searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : url;
    } catch {
      return url;
    }
  }
  if (url.includes("vimeo.com")) {
    const id = url.split("vimeo.com/")[1]?.split("?")[0];
    return id ? `https://player.vimeo.com/video/${id}` : url;
  }
  return url;
}

type VideoPreviewProps = {
  src: string;
  poster?: string;
  title: string;
};

function VideoPreview({ src, poster, title }: VideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const startPlayback = async () => {
    const node = videoRef.current;
    setStarted(true);
    if (!node) return;
    try {
      await node.play();
    } catch {
      // If play is blocked, controls remain visible for manual start.
    }
  };

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        controls={started}
        playsInline
        preload="none"
        poster={poster}
      >
        <source src={src} />
      </video>
      {!started ? (
        <button
          type="button"
          onClick={startPlayback}
          aria-label={`Reproducir video de ${title}`}
          className="absolute inset-0 flex items-center justify-center bg-black/25 transition hover:bg-black/40"
        >
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/35 bg-black/55 text-white shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
            <svg viewBox="0 0 24 24" className="h-8 w-8 translate-x-[1px]" fill="currentColor" aria-hidden="true">
              <path d="M8 5.5v13l10-6.5z" />
            </svg>
          </span>
        </button>
      ) : null}
    </div>
  );
}

type PhoneCarouselProps = {
  images: string[];
};

function PhoneCarousel({ images }: PhoneCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 2400);

    return () => window.clearInterval(timer);
  }, [images.length]);

  if (!images.length) {
    return <div className="h-full w-full bg-black" />;
  }

  return (
    <div className="relative h-full w-full bg-black">
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Vista ${index + 1} del plan personalizado`}
          fill
          unoptimized
          priority={index === 0}
          loading={index === 0 ? "eager" : "lazy"}
          className={`absolute inset-0 object-contain transition-opacity duration-700 ease-out ${
            index === activeIndex ? "opacity-100" : "opacity-0"
          }`}
          sizes="(max-width: 640px) 290px, (max-width: 1024px) 440px, 560px"
        />
      ))}
    </div>
  );
}

const ServiceRequestModal = dynamic(() => import("./ServiceRequestModal"), { ssr: false });

const ServicesClient = ({ services }: ServicesClientProps) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const openForm = (service: Service) => {
    setSelectedService(service);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <section id="servicios" className="py-16 sm:py-20 px-4 sm:px-6 md:px-10 border-t border-white/10">
      <div className="max-w-6xl mx-auto space-y-12 sm:space-y-14">

        <div className="space-y-6">
          <div className="text-center">
            <p className="text-xs uppercase tracking-[0.28em] text-white/55">Matriz de servicios</p>
            <h4 className="text-2xl sm:text-3xl font-bold mt-2">Soluciones clave para tu marca</h4>
          </div>

          <div className="space-y-8 sm:space-y-10">
            {services.map((service, index) => {
              const serviceNumber = normalizeServiceNumber(service.number);
              const mappedVideoUrl = serviceVideoByNumber[serviceNumber];
              const mappedPosterUrl = servicePosterByNumber[serviceNumber];
              const primaryReel = Array.isArray(service.reels) ? service.reels.find((reel) => reel?.url) : undefined;
              const videoUrl = mappedVideoUrl || primaryReel?.url;
              const videoPoster = mappedVideoUrl
                ? mappedPosterUrl || primaryReel?.posterUrl || primaryReel?.poster?.asset?.url || "/optimized/content-engage-1600.webp"
                : primaryReel?.posterUrl || primaryReel?.poster?.asset?.url || mappedPosterUrl || "/optimized/content-engage-1600.webp";
              const reversed = index % 2 === 1;

              return (
                <article
                  key={service.number ?? service.title ?? `service-${index}`}
                  className="rounded-2xl p-[1px] bg-[linear-gradient(90deg,#ffffff,#60a5fa,#a855f7,#ec4899,#ffffff)] animate-gradient-wave"
                >
                  <div className="rounded-2xl overflow-hidden bg-gray-800/55">
                    <div className={`flex flex-col md:flex-row ${reversed ? "md:flex-row-reverse" : ""}`}>
                      <div className="relative bg-black/60 md:w-[43%] lg:w-[40%] xl:w-[38%] md:flex-none">
                        {videoUrl ? (
                          <div className="relative w-full aspect-[9/16]">
                            {isDirectVideo(videoUrl) ? (
                              <VideoPreview
                                src={videoUrl}
                                poster={videoPoster}
                                title={service.title || "servicio"}
                              />
                            ) : isYouTube(videoUrl) || isVimeo(videoUrl) ? (
                              <iframe
                                src={getEmbedUrl(videoUrl)}
                                title={primaryReel?.title || `${service.title || "Servicio"} - Reel`}
                                className="h-full w-full"
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <a
                                href={videoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="h-full w-full flex items-center justify-center p-3 text-center text-sm text-white/80 hover:text-white transition"
                              >
                                Ver reel
                              </a>
                            )}
                          </div>
                        ) : (
                          <div className="aspect-[9/16] w-full flex items-center justify-center text-sm text-white/70">
                            Reel pendiente
                          </div>
                        )}
                      </div>

                      <div className="p-6 sm:p-8 lg:p-10 flex flex-col md:w-[57%] lg:w-[60%] xl:w-[62%]">
                        <div className="text-4xl sm:text-5xl font-bold text-blue-300">{service.number}</div>
                        <div className="space-y-2 mt-4">
                          <h5 className="text-2xl sm:text-3xl font-bold leading-tight text-white">{service.title}</h5>
                          <p className="text-white/80 text-base sm:text-lg text-balance">{service.description}</p>
                        </div>
                        <ul className="space-y-2 text-sm sm:text-base text-white/90 mt-5">
                          {(Array.isArray(service.items) ? service.items : []).map((item: string, itemIndex: number) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <svg
                                className="w-4 h-4 mt-1 flex-none text-blue-300"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                              </svg>
                              <span className="leading-snug">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-6 mt-auto">
                          <button
                            type="button"
                            onClick={() => openForm({ ...service, serviceKind: "service" })}
                            className="w-full rounded-full bg-white text-black text-xs sm:text-sm font-semibold uppercase tracking-wide py-3 hover:bg-zinc-200 transition"
                          >
                            Solicitar este servicio
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <div className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-xs uppercase tracking-[0.28em] text-white/55">Manejo de redes</p>
            <h4 className="text-2xl sm:text-3xl font-bold">Empieza tu plan personalizado</h4>
            <p className="text-sm sm:text-base text-white/65 max-w-3xl mx-auto">
              Cuéntanos tu meta, presupuesto y prioridades. Te enviamos una propuesta hecha a medida.
            </p>
          </div>

          <article className="rounded-2xl overflow-hidden border border-white/10 bg-black/50">
            <div className="relative overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_20%_25%,rgba(236,72,153,0.35),transparent_58%),radial-gradient(circle_at_84%_20%,rgba(96,165,250,0.35),transparent_48%),linear-gradient(130deg,rgba(2,6,23,0.96),rgba(30,27,75,0.92),rgba(60,7,83,0.9))]">
              <div className="absolute -left-10 top-8 h-24 w-24 rounded-full bg-fuchsia-500/30 blur-2xl" />
              <div className="absolute right-1 top-3 h-20 w-20 rounded-full bg-blue-400/30 blur-2xl" />
              <div className="relative mx-auto flex h-[31rem] w-full max-w-lg items-center justify-center px-3 py-6 sm:h-[48rem] sm:max-w-3xl sm:px-6 sm:py-8">
                <div className="relative w-[18.2rem] sm:w-[30rem] aspect-[1076/1628]">
                  <div
                    className="absolute left-[8.8%] right-[8.8%] top-[5.7%] bottom-[5.6%] overflow-hidden rounded-[2.1rem] bg-black/70"
                    aria-label="Espacio para carrusel dentro del celular"
                    data-carousel-slot="plan-personalizado"
                  >
                    <PhoneCarousel images={planCarouselImages} />
                  </div>
                  <Image
                    src="/celular.png"
                    alt="Marco de celular para carrusel del plan personalizado"
                    fill
                    className="pointer-events-none select-none object-contain"
                    sizes="(max-width: 640px) 300px, (max-width: 1024px) 460px, 560px"
                  />
                </div>
              </div>
            </div>

            <div className="p-5 flex flex-col text-center">
              <p className="text-sm text-white/75 leading-relaxed">
                Diseñamos una estrategia según tus objetivos, rubro y presupuesto para que inviertas de forma inteligente.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-white/85 max-w-[20rem] mx-auto">
                <li className="flex items-start justify-center gap-2 text-center">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  <span>Diagnóstico inicial de tu marca</span>
                </li>
                <li className="flex items-start justify-center gap-2 text-center">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  <span>Mix flexible de servicios y entregables</span>
                </li>
                <li className="flex items-start justify-center gap-2 text-center">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-fuchsia-300" />
                  <span>Plan escalable por etapas de crecimiento</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() =>
                  openForm({
                    title: "Manejo de redes - Plan personalizado",
                    description: "Propuesta diseñada según objetivos, rubro y presupuesto.",
                    serviceKind: "plan",
                  })
                }
                className="mt-6 rounded-full bg-white text-black text-xs font-semibold uppercase tracking-wide py-2.5 hover:bg-zinc-200 transition"
              >
                Empezar plan personalizado
              </button>
            </div>
          </article>
        </div>
      </div>

      {isFormOpen && selectedService ? (
        <ServiceRequestModal
          key={`${selectedService.title ?? selectedService.number ?? "service-form"}-${selectedService.prefillPlan ?? ""}`}
          service={selectedService}
          onClose={closeForm}
        />
      ) : null}
    </section>
  );
};

export default ServicesClient;
