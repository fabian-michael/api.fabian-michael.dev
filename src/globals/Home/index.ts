import { GlobalConfig } from "payload/types";
import { verifyUser } from "../../access/verifyUser";
import { richText } from "../../fields/richText";

export const Home: GlobalConfig = {
    access: {
        read: verifyUser({
            allowApiKeys: true
        }),
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