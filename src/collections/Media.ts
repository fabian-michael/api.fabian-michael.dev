import { CollectionConfig } from 'payload/types'

export const Media: CollectionConfig = {
    access: {
        read: () => true,
    },
    slug: 'media',
    fields: [
        {
            name: 'alt',
            type: 'text',
        },
    ],
    upload: {
        imageSizes: [
            {
                name: 'square',
                height: 320,
                width: 320,
                position: 'centre',
            },
        ],
        adminThumbnail: 'square',
        mimeTypes: ['image/*'],
    },
}