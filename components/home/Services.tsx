import { getServices } from "@/lib/sanity.queries";
import ServicesClient from "./ServicesClient";

const hardcodedServices = [
  {
    number: "01",
    title: "Digitalizaci\u00f3n",
    description: "Construimos soluciones inteligentes de pr\u00f3xima generaci\u00f3n en la intersecci\u00f3n de nuevas oportunidades de negocio e innovaciones tecnol\u00f3gicas.",
    items: ["Modernizaci\u00f3n de legado", "Dise\u00f1o de soluciones", "Habilitaci\u00f3n tecnol\u00f3gica", "Sistemas mobile-first"],
  },
  {
    number: "02",
    title: "Modernizaci\u00f3n",
    description: "Ayudamos a las empresas a modernizar sus sistemas y procesos para mejorar la eficiencia y la agilidad.",
    items: ["Auditor\u00eda de sistemas", "Migraci\u00f3n a la nube", "Optimizaci\u00f3n de infraestructura", "Automatizaci\u00f3n de procesos"],
  },
  {
    number: "03",
    title: "Acelerando la innovaci\u00f3n",
    description: "Impulsamos la innovaci\u00f3n a trav\u00e9s de la experimentaci\u00f3n y el desarrollo de nuevos productos y servicios.",
    items: ["Laboratorio de innovaci\u00f3n", "Desarrollo de prototipos", "Lanzamiento de MVP", "Cultura de la innovaci\u00f3n"],
  },
  {
    number: "04",
    title: "Consultor\u00eda de negocios",
    description: "Ofrecemos asesoramiento estrat\u00e9gico para ayudar a las empresas a alcanzar sus objetivos de negocio.",
    items: ["Estrategia digital", "An\u00e1lisis de mercado", "Optimizaci\u00f3n de procesos", "Transformaci\u00f3n digital"],
  },
];

const Services = async () => {
  let services = [];
  try {
    services = await getServices();
  } catch (error) {
    console.error("Fall\u00f3 al obtener los servicios de Sanity, usando datos predefinidos:", error);
    services = hardcodedServices;
  }

  return <ServicesClient services={services} />;
};

export default Services;
