import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Héroe',
  type: 'document',
  fields: [
    defineField({
      name: 'statusLabel',
      title: 'Etiqueta de Estado',
      type: 'string',
      description: 'Pequeño texto sobre el botón (por ejemplo, Abierto para contrataciones)',
    }),
    defineField({
      name: 'titlePrimary',
      title: 'Título Principal',
      type: 'string',
      description: 'Primera línea del título (ej. Agencia)',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Título Destacado',
      type: 'string',
      description: 'Palabra destacada con gradiente (ej. Engage)',
    }),
    defineField({
      name: 'description',
      title: 'Descripción',
      type: 'text',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Etiqueta del CTA',
      type: 'string',
      description: 'Texto del botón principal',
    }),
    defineField({
      name: 'ctaHref',
      title: 'URL del CTA',
      type: 'string',
      description: 'Enlace del botón',
    }),
  ],
})
