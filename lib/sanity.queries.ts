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
export const teamMembersQuery = groq`*[_type == "teamMember"]`;
export const servicesQuery = groq`*[_type == "service"] | order(number asc)`;
export const testimonialsQuery = groq`*[_type == "testimonial"]`;
export const heroQuery = groq`*[_type == "hero"][0]`;

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

export async function getTeamMembers() {
  if (!isSanityConfigured) return [];
  return client.fetch(teamMembersQuery);
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