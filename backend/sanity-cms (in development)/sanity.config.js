import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'thijmenpelgrom.com',

  projectId: '9xgytrkv',
  dataset: 'thijmenpelgrom',

  plugins: [structureTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
