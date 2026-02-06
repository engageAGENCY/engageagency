import {groq} from 'next-sanity'
import {client} from './sanity.client'

export const projectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt desc)`
export const teamMembersQuery = groq`*[_type == "teamMember"]`
export const servicesQuery = groq`*[_type == "service"] | order(number asc)`
export const testimonialsQuery = groq`*[_type == "testimonial"]`
export const heroQuery = groq`*[_type == "hero"][0]`

export async function getProjects() {
  return client.fetch(projectsQuery)
}

export async function getTeamMembers() {
  return client.fetch(teamMembersQuery)
}

export async function getServices() {
    return client.fetch(servicesQuery)
}

export async function getTestimonials() {
    return client.fetch(testimonialsQuery)
}

export async function getHero() {
  return client.fetch(heroQuery)
}
