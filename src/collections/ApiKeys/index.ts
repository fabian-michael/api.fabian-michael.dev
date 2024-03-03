import { CollectionConfig } from 'payload/types'

export const ApiKeys: CollectionConfig = {
  slug: 'api-keys',
  auth: {
    useAPIKey: true,
    disableLocalStrategy: true,
  },
  fields: [
  ],
}