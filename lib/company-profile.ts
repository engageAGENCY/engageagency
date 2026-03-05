import { getCompanyInfo } from "./sanity.queries";

export type CompanyProfile = {
  aboutHeadline: string;
  aboutText: string;
  mission: string;
  vision: string;
  values: string[];
  yearsExperience: number;
  clientsCount: number;
  teamSize: number;
  legalName: string;
  rnc: string;
  foundationDate: string;
  generalManager: string;
  adminManager: string;
  economicActivity: string;
  address: string;
  email: string;
  whatsapp: string;
  phone: string;
  instagram: string;
};

export const fallbackCompanyProfile: CompanyProfile = {
  aboutHeadline: "Impulsamos marcas con estrategia, contenido y performance.",
  aboutText:
    "Somos una agencia de publicidad digital enfocada en creacion de contenido para redes sociales. Disenamos, producimos y ejecutamos estrategias para que cada marca se diferencie, conecte con su audiencia y convierta su presencia digital en resultados medibles.",
  mission:
    "Ayudar a marcas y negocios a crecer con contenido estrategico, creatividad aplicada y ejecucion consistente en canales digitales.",
  vision:
    "Consolidarnos como agencia boutique de referencia en Republica Dominicana por la calidad de nuestras ideas, produccion y resultados.",
  values: ["Compromiso", "Creatividad", "Estrategia", "Transparencia", "Trabajo en equipo"],
  yearsExperience: 5,
  clientsCount: 25,
  teamSize: 12,
  legalName: "Engagency EIRL",
  rnc: "132717619",
  foundationDate: "2021-06-06",
  generalManager: "Laura Gabriela De Castro",
  adminManager: "Henry Garrido Anico",
  economicActivity: "Manejo de publicidad online",
  address: "C. Eugenio Deschamps 11, Santo Domingo, Republica Dominicana",
  email: "engagencyrd@gmail.com",
  whatsapp: "+1 809-390-2905",
  phone: "+1 809-756-9944",
  instagram: "@engagencyrd",
};

export async function getCompanyProfileWithFallback(): Promise<CompanyProfile> {
  try {
    const data = await getCompanyInfo();
    if (!data) return fallbackCompanyProfile;

    return {
      ...fallbackCompanyProfile,
      ...data,
      values:
        Array.isArray(data.values) && data.values.length
          ? data.values.filter((value: unknown): value is string => typeof value === "string")
          : fallbackCompanyProfile.values,
    };
  } catch (error) {
    console.error("Fallo al obtener companyInfo desde Sanity, usando fallback:", error);
    return fallbackCompanyProfile;
  }
}
