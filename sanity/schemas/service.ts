import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Numero',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descripcion',
      type: 'text',
    }),
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'reels',
      title: 'Reels verticales',
      description: 'Puedes agregar videos MP4 directos o enlaces de YouTube/Vimeo.',
      type: 'array',
      of: [
        defineField({
          name: 'reel',
          title: 'Reel',
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              title: 'Titulo',
              type: 'string',
            }),
            defineField({
              name: 'url',
              title: 'URL del video',
              type: 'url',
              validation: (Rule) => Rule.required().uri({
                scheme: ['http', 'https'],
              }),
            }),
            defineField({
              name: 'poster',
              title: 'Poster (opcional)',
              type: 'image',
              options: {
                hotspot: true,
              },
            }),
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'url',
              media: 'poster',
            },
            prepare(selection) {
              return {
                title: selection.title || 'Reel sin titulo',
                subtitle: selection.subtitle,
                media: selection.media,
              }
            },
          },
        }),
      ],
    }),
  ],
})
