import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'visualCase',
  title: 'Caso Visual',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Titulo',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'caption',
      title: 'Subtitulo',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Imagen',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Enlace',
      type: 'url',
    }),
    defineField({
      name: 'account',
      title: 'Cuenta',
      type: 'string',
      description: 'Ejemplo: @engagencyrd',
    }),
    defineField({
      name: 'order',
      title: 'Orden',
      type: 'number',
      description: 'Menor = primero',
      initialValue: 10,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'account',
      media: 'image',
    },
  },
})
