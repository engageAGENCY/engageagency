import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'companyInfo',
  title: 'Información Empresarial',
  type: 'document',
  fields: [
    defineField({
      name: 'aboutHeadline',
      title: 'Titular principal',
      type: 'string',
      initialValue: 'Impulsamos marcas con estrategia, contenido y performance.',
    }),
    defineField({
      name: 'aboutText',
      title: 'Texto de empresa',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'mission',
      title: 'Misión',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'vision',
      title: 'Visión',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'values',
      title: 'Valores',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Años de experiencia',
      type: 'number',
      initialValue: 5,
    }),
    defineField({
      name: 'clientsCount',
      title: 'Cantidad de clientes',
      type: 'number',
      initialValue: 25,
    }),
    defineField({
      name: 'teamSize',
      title: 'Tamaño del equipo',
      type: 'number',
      initialValue: 12,
    }),
    defineField({
      name: 'legalName',
      title: 'Razón social',
      type: 'string',
    }),
    defineField({
      name: 'rnc',
      title: 'RNC',
      type: 'string',
    }),
    defineField({
      name: 'foundationDate',
      title: 'Fecha de constitución',
      type: 'date',
    }),
    defineField({
      name: 'generalManager',
      title: 'Gerente general',
      type: 'string',
    }),
    defineField({
      name: 'adminManager',
      title: 'Gerente administrativo',
      type: 'string',
    }),
    defineField({
      name: 'economicActivity',
      title: 'Actividad económica',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Dirección',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Correo',
      type: 'string',
    }),
    defineField({
      name: 'whatsapp',
      title: 'WhatsApp',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Teléfono',
      type: 'string',
    }),
    defineField({
      name: 'instagram',
      title: 'Instagram',
      type: 'string',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Perfil corporativo',
      }
    },
  },
})
