import { createClient } from "next-sanity";

const configuredProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim();
const configuredDataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim();

export const isSanityConfigured = Boolean(
  configuredProjectId &&
    configuredDataset &&
    configuredProjectId !== "pon_tu_id_aqui",
);

export const client = createClient({
  projectId: isSanityConfigured ? configuredProjectId : "missing-project-id",
  dataset: configuredDataset || "production",
  apiVersion: "2024-01-01",
  useCdn: process.env.NODE_ENV === "production",
});