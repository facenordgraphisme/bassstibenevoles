import { defineField, defineType } from 'sanity'

export const volunteer = defineType({
    name: 'volunteer',
    title: 'Bénévole',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nom',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'firstName',
            title: 'Prénom',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'email',
            title: 'Adresse E-mail',
            type: 'string',
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: 'phone',
            title: 'Numéro de Téléphone',
            type: 'string',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'address',
            title: 'Adresse',
            type: 'text',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'roles', // Renamed to plural to reflect array
            title: 'Postes Souhaités',
            type: 'array',
            of: [{ type: 'string' }],
            options: {
                list: [
                    { title: 'Bar', value: 'bar' },
                    { title: 'Billetterie', value: 'billetterie' },
                    { title: 'Basss Patrol', value: 'basss_patrol' },
                    { title: 'Parking', value: 'parking' },
                    { title: "Peu importe (j'aide où on a besoin de moi)", value: 'any' },
                ],
                layout: 'grid', // Better for multiple choices
            },
            validation: (rule) => rule.required().min(1).error('Sélectionne au moins un poste'),
        }),
        defineField({
            name: 'hasExperience',
            title: 'Avez-vous déjà été bénévole ?',
            type: 'boolean',
            initialValue: false,
        }),
        defineField({
            name: 'previousFestival',
            title: 'Si oui, dans quel festival ?',
            type: 'string',
            hidden: ({ document }) => !document?.hasExperience,
        }),
        defineField({
            name: 'previousRole',
            title: 'Quel poste occupais-tu ?',
            type: 'string',
            hidden: ({ document }) => !document?.hasExperience,
        }),
        defineField({
            name: 'slots',
            title: 'Nombre de créneaux souhaités (2h par créneau)',
            type: 'string',
            options: {
                list: [
                    { title: '2 Créneaux', value: '2' },
                    { title: '3 Créneaux', value: '3' },
                    { title: '4 Créneaux', value: '4' },
                ],
                layout: 'radio',
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'availabilityStart',
            title: 'Disponibilité - Début',
            type: 'datetime',
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: 'availabilityEnd',
            title: 'Disponibilité - Fin',
            type: 'datetime',
            validation: (rule) => rule.required().min(rule.valueOfField('availabilityStart')),
        }),
        defineField({
            name: 'comment',
            title: 'Commentaire / Message libre',
            type: 'text',
        }),
    ],
})
