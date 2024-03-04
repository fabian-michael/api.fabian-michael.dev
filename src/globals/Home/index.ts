import { GlobalConfig } from "payload/types";
import { isLoggedIn } from "../../access/isLoggedIn";
import { richText } from "../../fields/richText";

export const Home: GlobalConfig = {
    access: {
        read: isLoggedIn(),
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
                        ...richText('text'),
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