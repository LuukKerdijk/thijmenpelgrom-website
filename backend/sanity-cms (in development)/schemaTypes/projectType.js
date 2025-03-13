import { defineArrayMember, defineField, defineType } from 'sanity'
import { customId } from '../lib/customId'
import editButton from '../lib/components/button'
import imageSettings from '../lib/components/imageSettings'

export const projectType = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      type: 'string',
      readOnly: true,
      initialValue: customId,
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'location',
      type: 'string',
    }),
    defineField({
      name: 'date',
      type: 'date',
    }),
    defineField({
      name: 'client',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'editbutton',
      type: 'boolean',
      title: 'Upload Images',
      hidden: ({document}) => document?._id.includes("draft"),
      components: {input: editButton}
    }),
    defineField({
      name: 'uploadimages',
      title: 'Upload Images',
      type: 'array',
      hidden: ({document}) => !document?._id.includes("draft"),
      of: [
        defineArrayMember({
          name: 'image',
          type: 'image',
          components: {item: imageSettings},
          fields: [
            {name: 'main', type: 'boolean'},
            {name: 'contain', type: 'boolean'},
          ]
        })
      ]
    }),
  ],
})

