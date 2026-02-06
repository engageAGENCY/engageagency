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
      name: 'description',
      title: 'Descripci\u00f3n',
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
