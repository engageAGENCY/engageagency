import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Portafolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'T\u00edtulo',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Resumen corto',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'A\u00f1o',
      type: 'number',
    }),
    defineField({
      name: 'services',
      title: 'Servicios aplicados',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'results',
      title: 'Resultados',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'body',
      title: 'Historia del proyecto',
      type: 'array',
      of: [
        {type: 'block'},
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'gallery',
      title: 'Galer\u00eda',
      type: 'array',
      of: [
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'alt',
              title: 'Texto alternativo',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'videos',
      title: 'Videos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'T\u00edtulo', type: 'string'},
            {name: 'url', title: 'URL', type: 'url'},
          ],
        },
      ],
    }),
    defineField({
      name: 'link',
      title: 'Enlace',
      type: 'url',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Menor = primero',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
    },
  },
})
