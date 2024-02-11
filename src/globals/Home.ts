import { lexicalHTML } from "@payloadcms/richtext-lexical";
import { GlobalConfig } from "payload/types";

export const Home: GlobalConfig = {
    access: {
        read: () => true,
    },
    slug: 'home',
    fields: [
        {
            type: 'tabs',
            tabs: [
                {
                    name: 'general',
                    fields: [
                        {
                            name: 'title',
                            type: 'text',
                        }
                    ]
                },
                {
                    name: 'hero',
                    fields: [
                        {
                            type: 'richText',
                            name: 'text',
                        },
                        lexicalHTML('text', {
                            name: 'text_html'
                        }),
                        {
                            name: 'image',
                            type: 'upload',
                            relationTo: 'media',
                            filterOptions: {
                                mimeType: { contains: 'image' },
                            },
                        },
                    ],
                },
            ],
        }
    ]
}