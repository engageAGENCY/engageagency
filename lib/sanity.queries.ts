import { groq } from "next-sanity";
import { client, isSanityConfigured } from "./sanity.client";

export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc){
  ...,
  "slug": slug.current
}`;
export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0]{
  ...,
  "slug": slug.current
}`;
export const projectSlugsQuery = groq`*[_type == "project" && defined(slug.current)].slug.current`;
export const servicesQuery = groq`*[_type == "service"] | order(number asc){
  ...,
  reels[]{
    ...,
    "posterUrl": poster.asset->url
  }
}`;
export const testimonialsQuery = groq`*[_type == "testimonial"]`;
export const heroQuery = groq`*[_type == "hero"][0]`;
export const visualCasesQuery = groq`*[_type == "visualCase"] | order(order asc, _createdAt desc)`;
export const companyInfoQuery = groq`*[_type == "companyInfo"][0]`;

export async function getProjects() {
  if (!isSanityConfigured) return [];
  return client.fetch(projectsQuery);
}

export async function getProjectBySlug(slug: string) {
  if (!isSanityConfigured || !slug) return null;
  return client.fetch(projectBySlugQuery, { slug });
}

export async function getProjectSlugs() {
  if (!isSanityConfigured) return [];
  return client.fetch(projectSlugsQuery);
}

export async function getServices() {
  if (!isSanityConfigured) return [];
  return client.fetch(servicesQuery);
}

export async function getTestimonials() {
  if (!isSanityConfigured) return [];
  return client.fetch(testimonialsQuery);
}

export async function getHero() {
  if (!isSanityConfigured) return null;
  return client.fetch(heroQuery);
}

export async function getVisualCases() {
  if (!isSanityConfigured) return [];
  return client.fetch(visualCasesQuery);
}

export async function getCompanyInfo() {
  if (!isSanityConfigured) return null;
  return client.fetch(companyInfoQuery);
}
