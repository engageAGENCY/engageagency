import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero',
  type: 'document',
  fields: [
    defineField({
      name: 'statusLabel',
      title: 'Etiqueta de estado',
      type: 'string',
      description: 'Texto pequeno sobre el titulo',
    }),
    defineField({
      name: 'titlePrimary',
      title: 'Titulo principal',
      type: 'string',
      description: 'Linea principal del titulo',
    }),
    defineField({
      name: 'titleHighlight',
      title: 'Titulo destacado',
      type: 'string',
      description: 'Palabra destacada con estilo principal',
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'text',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'Texto del boton',
      type: 'string',
    }),
    defineField({
      name: 'ctaHref',
      title: 'URL del boton',
      type: 'string',
    }),
  ],
})
