import { getServices } from "@/lib/sanity.queries";
import ServicesClient from "./ServicesClient";

const fallbackServiceVideos = [
  "/videos/service-01.mp4",
  "/videos/service-02.mp4",
  "/videos/service-03.mp4",
  "/videos/service-04.mp4",
  "/videos/service-05.mp4",
  "/videos/service-06.mp4",
];

const hardcodedServices = [
  {
    number: "01",
    title: "Manejo de redes sociales",
    description:
      "Planificamos, producimos y publicamos contenido para mantener tus redes activas con una línea visual coherente.",
    items: ["Plan mensual de contenido", "Calendario y copywriting", "Gestión de comunidad", "Reporte de avance"],
  },
  {
    number: "02",
    title: "Producción audiovisual",
    description:
      "Creamos piezas en foto y video para mostrar tu marca de forma atractiva en Instagram, TikTok y campañas.",
    items: ["Reels y videos verticales", "Cobertura de sesiones", "Edición y postproducción", "Entrega optimizada para redes"],
  },
  {
    number: "03",
    title: "Diseño gráfico estratégico",
    description:
      "Construimos una identidad visual clara para que cada publicación sume reconocimiento y recordación de marca.",
    items: ["Plantillas de contenido", "Piezas promocionales", "Diseño para historias", "Adaptaciones multiformato"],
  },
  {
    number: "04",
    title: "Publicidad digital",
    description:
      "Gestionamos pauta en Meta y otras plataformas para atraer clientes con campañas optimizadas por objetivo.",
    items: ["Configuración de campañas", "Segmentación y pruebas", "Retargeting", "Reporte de resultados"],
  },
  {
    number: "05",
    title: "Marketing de influencers",
    description:
      "Conectamos tu marca con perfiles afines para amplificar alcance y conversión desde contenido colaborativo.",
    items: ["Selección de creadores", "Negociación y coordinación", "Control de entregables", "Medición de impacto"],
  },
  {
    number: "06",
    title: "Fotografía profesional",
    description:
      "Sesiones de producto, lifestyle y marca personal para elevar la percepción de calidad de tu negocio.",
    items: ["Dirección de arte", "Fotografía de producto", "Retoque y color", "Entrega web y social media"],
  },
];

function normalizeServices(input: any[]) {
  const deduped = new Map<string, any>();

  for (const service of Array.isArray(input) ? input : []) {
    const rawTitle = typeof service?.title === "string" ? service.title.trim() : "";
    const key = rawTitle.toLowerCase();
    if (!key) continue;
    if (!deduped.has(key)) {
      deduped.set(key, service);
    }
  }

  return Array.from(deduped.values()).slice(0, 6);
}

function attachFallbackReels(input: any[]) {
  return input.map((service, index) => {
    const existingReels = Array.isArray(service?.reels)
      ? service.reels.filter((reel: any) => typeof reel?.url === "string" && reel.url.trim().length > 0)
      : [];

    if (existingReels.length > 0) {
      return {
        ...service,
        reels: [existingReels[0]],
      };
    }

    const serviceNumber = Number.parseInt(String(service?.number ?? ""), 10);
    const fallbackIndex =
      Number.isFinite(serviceNumber) && serviceNumber > 0
        ? Math.min(serviceNumber - 1, fallbackServiceVideos.length - 1)
        : Math.min(index, fallbackServiceVideos.length - 1);

    return {
      ...service,
      reels: [
        {
          title: `Video de ${service?.title ?? `Servicio ${index + 1}`}`,
          url: fallbackServiceVideos[fallbackIndex],
        },
      ],
    };
  });
}

const Services = async () => {
  let services = [];
  try {
    services = await getServices();
    services = normalizeServices(services);
    if (!services || services.length === 0) {
      services = hardcodedServices;
    }
  } catch (error) {
    console.error("Fall\u00f3 al obtener los servicios de Sanity, usando datos predefinidos:", error);
    services = hardcodedServices;
  }

  return <ServicesClient services={attachFallbackReels(services)} />;
};

export default Services;
