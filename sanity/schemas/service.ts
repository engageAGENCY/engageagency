import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Servicio',
  type: 'document',
  fields: [
    defineField({
      name: 'number',
      title: 'Número',
      type: 'string',
    }),
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
        name: 'description',
        title: 'Descripción',
        type: 'text',
      }),
    defineField({
      name: 'items',
      title: 'Ítems',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
})
