import { CollectionConfig } from 'payload/types'

export const FrontendUsers: CollectionConfig = {
  slug: 'frontend-users',
  auth: {
    verify: true,
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}