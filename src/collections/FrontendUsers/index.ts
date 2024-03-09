import { CollectionConfig } from 'payload/types'

export const FrontendUsers: CollectionConfig = {
  slug: 'frontend-users',
  auth: {
    verify: true,
    tokenExpiration: 48 * 60 * 60, // 48 hours
  },
  admin: {
    useAsTitle: 'email',
  },
  fields: [
    // Email added by default
    // Add more fields as needed
  ],
}