import { CollectionConfig } from 'payload/types'

export const ApiKeys: CollectionConfig = {
  slug: 'api-keys',
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    }
  ],
}