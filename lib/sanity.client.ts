import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID === 'pon_tu_id_aqui' || !process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  ? '' // Proporciona una cadena vacía como projectId de respaldo
  : process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

export const client = createClient({
  projectId: projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
})