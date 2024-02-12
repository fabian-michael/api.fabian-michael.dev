import path from 'path';
import { CollectionConfig } from 'payload/types';

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
        staticDir: path.join(process.cwd(), 'media'),
        staticURL: '/media',
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